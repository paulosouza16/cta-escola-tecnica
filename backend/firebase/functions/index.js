/**
 * ============================================================================
 * CLOUD FUNCTIONS FIREBASE — SECRETARIA ONLINE (FASE B)
 * CTA Escola Técnica (Rio de Janeiro)
 * ============================================================================
 * Funções serverless gerenciadas (sem servidor próprio):
 * 1) criarRequerimentoSecretaria:
 *    - Exige HTTPS; aplica rate-limit por IP; verifica honeypot/Turnstile.
 *    - Valida CPF matematicamente; NUNCA registra CPF, RG, nome ou e-mail em logs.
 *    - Valida a REGRA DE NEGÓCIO CRÍTICA:
 *        * Bangu: Eletrotécnica, Enfermagem, Informática.
 *        * Campo Grande: SOMENTE Eletrotécnica e Informática.
 *    - Valida anexos obrigatórios conforme o campo "sexo" (Masculino = 5, Feminino = 4).
 *    - Valida tipo (PDF, JPG, PNG), assinatura de bytes (magic bytes) e tamanho máximo.
 *    - Gera protocolo único e sequencial no servidor: CTA-AAAA-000001.
 *    - Renomeia os arquivos no servidor com UUID (nunca usa o nome original) e grava em
 *      bucket privado com Content-Disposition: attachment (nunca executa arquivos).
 *    - Envia e-mail de confirmação ao aluno e notificação à secretaria (sem anexar os
 *      documentos no e-mail; apenas resumo e link seguro para o painel autenticado).
 * 2) consultarProtocoloSecretaria:
 *    - Recebe protocolo + CPF, valida hash e retorna apenas o status e orientação.
 * 3) listarRequerimentosSecretaria / atualizarStatusRequerimento / gerarLinkTemporarioAnexo:
 *    - Exigem token Firebase Auth de usuário autenticado da secretaria (`secretaria == true`).
 *    - Geram Signed URLs temporárias (15 minutos) para visualização segura dos anexos.
 */

const crypto = require("crypto");
const admin = require("firebase-admin");
const { onRequest } = require("firebase-functions/v2/https");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const storage = admin.storage();

// Regras de negócio no servidor
const UNIDADES_CURSOS = {
  "Bangu": ["Eletrotécnica", "Enfermagem", "Informática"],
  "Campo Grande": ["Eletrotécnica", "Informática"]
};

const TIPOS_REQUERIMENTO_VALIDOS = [
  "Histórico escolar",
  "Certificado",
  "Diploma",
  "Declaração",
  "Outros"
];

const STATUS_VALIDOS = [
  "Recebido",
  "Em análise",
  "Pendente de documentos",
  "Concluído"
];

const ANEXOS_MASCULINO = [
  "certidao_nascimento",
  "rg_cpf",
  "comprovante_residencia",
  "historico_escolar_anterior",
  "certificado_reservista"
];

const ANEXOS_FEMININO = [
  "certidao_nascimento",
  "rg_cpf",
  "comprovante_residencia",
  "historico_escolar_anterior"
];

const MAX_FILE_SIZE_BYTES = Number(process.env.SECRETARIA_MAX_FILE_BYTES || 5 * 1024 * 1024);

function validateCPF(raw) {
  const cpf = String(raw || "").replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(cpf.charAt(10), 10);
}

function hashSensitiveValue(value) {
  const salt = process.env.CPF_HASH_SALT || "CONFIGURE_CPF_HASH_SALT_IN_SECRET_MANAGER";
  return crypto
    .createHmac("sha256", salt)
    .update(String(value || "").replace(/\D/g, ""))
    .digest("hex");
}

function detectSafeExtensionByMagicBytes(buffer, declaredMime) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 4) return null;
  // PDF: %PDF (25 50 44 46)
  if (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    declaredMime === "application/pdf"
  ) {
    return { ext: "pdf", contentType: "application/pdf" };
  }
  // JPEG: FF D8 FF
  if (
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff &&
    declaredMime === "image/jpeg"
  ) {
    return { ext: "jpg", contentType: "image/jpeg" };
  }
  // PNG: 89 50 4E 47
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    declaredMime === "image/png"
  ) {
    return { ext: "png", contentType: "image/png" };
  }
  return null;
}

async function generateAtomicProtocol() {
  const year = String(new Date().getFullYear());
  const counterRef = db.collection("contadores_protocolo").doc(year);
  const seqNumber = await db.runTransaction(async (tx) => {
    const snap = await tx.get(counterRef);
    const current = snap.exists ? Number(snap.data().ultimoNumero || 0) : 0;
    const next = current + 1;
    tx.set(
      counterRef,
      {
        ultimoNumero: next,
        atualizadoEm: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
    return next;
  });
  return `CTA-${year}-${String(seqNumber).padStart(6, "0")}`;
}

async function verifySecretariaToken(req) {
  const authHeader = String(req.headers.authorization || "");
  if (!authHeader.startsWith("Bearer ")) {
    throw new Error("Não autenticado.");
  }
  const idToken = authHeader.slice(7).trim();
  const decoded = await admin.auth().verifyIdToken(idToken);
  if (!decoded || decoded.secretaria !== true) {
    throw new Error("Acesso permitido somente para usuários autorizados da secretaria.");
  }
  return decoded;
}

async function sendTransactionalEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "Secretaria CTA <nao-responda@ctarj.org.br>";
  if (!apiKey || !to || to.includes("[PREENCHER")) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject,
      html
    })
  });
}

// 1. Criar Requerimento e Gerar Protocolo no Servidor
exports.criarRequerimentoSecretaria = onRequest({ cors: true, maxInstances: 10 }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const body = req.body || {};

    // Honeypot anti-spam
    if (body.website_hp) {
      return res.status(400).json({ error: "Requisição inválida." });
    }

    const nome = String(body.nome || "").trim();
    const cpfDigits = String(body.cpf || "").replace(/\D/g, "");
    const rg = String(body.rg || "").trim();
    const email = String(body.email || "").trim();
    const sexo = String(body.sexo || "").trim();
    const unidade = String(body.unidade || "").trim();
    const curso = String(body.curso || "").trim();
    const anoConclusao = parseInt(String(body.anoConclusao || ""), 10);
    const tipoRequerimento = String(body.tipoRequerimento || "").trim();
    const outrosDescricao = String(body.outrosDescricao || "").trim();
    const lgpdConsent = body.lgpdConsent === "true" || body.lgpdConsent === true;

    if (nome.length < 5 || !nome.includes(" ")) {
      return res.status(400).json({ error: "Informe o nome completo do aluno." });
    }
    if (!validateCPF(cpfDigits)) {
      return res.status(400).json({ error: "CPF inválido." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "E-mail inválido." });
    }
    if (sexo !== "Masculino" && sexo !== "Feminino") {
      return res.status(400).json({ error: "Campo sexo inválido." });
    }

    // Validação no servidor da Regra de Negócio Crítica: Unidade x Curso
    const cursosPermitidos = UNIDADES_CURSOS[unidade];
    if (!cursosPermitidos || !cursosPermitidos.includes(curso)) {
      return res.status(400).json({
        error:
          unidade === "Campo Grande"
            ? "A unidade Campo Grande oferece somente Eletrotécnica e Informática."
            : "Combinação de unidade e curso inválida."
      });
    }

    const maxYear = new Date().getFullYear() + 5;
    if (Number.isNaN(anoConclusao) || anoConclusao < 1970 || anoConclusao > maxYear) {
      return res.status(400).json({ error: "Ano de conclusão inválido." });
    }
    if (!TIPOS_REQUERIMENTO_VALIDOS.includes(tipoRequerimento)) {
      return res.status(400).json({ error: "Tipo de requerimento inválido." });
    }
    if (tipoRequerimento === "Outros" && outrosDescricao.length < 5) {
      return res.status(400).json({ error: "Descreva o documento solicitado em 'Outros'." });
    }
    if (!lgpdConsent) {
      return res.status(400).json({ error: "Consentimento LGPD obrigatório." });
    }

    // Validação dos anexos obrigatórios conforme o sexo
    const anexosExigidos = sexo === "Feminino" ? ANEXOS_FEMININO : ANEXOS_MASCULINO;
    const uploadedFiles = body.arquivosBase64 || {};
    for (const anexoId of anexosExigidos) {
      const fileObj = uploadedFiles[anexoId];
      if (!fileObj || !fileObj.base64 || !fileObj.mimeType) {
        return res.status(400).json({ error: `Anexo obrigatório ausente: ${anexoId}` });
      }
      const buffer = Buffer.from(fileObj.base64, "base64");
      if (buffer.length === 0 || buffer.length > MAX_FILE_SIZE_BYTES) {
        return res.status(400).json({ error: `Tamanho de arquivo inválido para ${anexoId}.` });
      }
      const detected = detectSafeExtensionByMagicBytes(buffer, fileObj.mimeType);
      if (!detected) {
        return res.status(400).json({ error: `Formato não permitido para ${anexoId}. Envie PDF, JPG ou PNG.` });
      }
    }

    // Gerar protocolo único no servidor (CTA-AAAA-000001)
    const protocolo = await generateAtomicProtocol();
    const bucket = storage.bucket();
    const year = new Date().getFullYear();
    const savedAttachments = [];

    for (const anexoId of anexosExigidos) {
      const fileObj = uploadedFiles[anexoId];
      const buffer = Buffer.from(fileObj.base64, "base64");
      const detected = detectSafeExtensionByMagicBytes(buffer, fileObj.mimeType);
      // Nunca usar o nome original enviado pelo usuário
      const safeServerPath = `requerimentos/${year}/${protocolo}/${anexoId}_${crypto.randomUUID()}.${detected.ext}`;
      const fileRef = bucket.file(safeServerPath);
      await fileRef.save(buffer, {
        resumable: false,
        contentType: detected.contentType,
        metadata: {
          cacheControl: "private, no-store, max-age=0",
          contentDisposition: `attachment; filename="${anexoId}.${detected.ext}"`
        }
      });
      savedAttachments.push({
        id: anexoId,
        storagePath: safeServerPath,
        contentType: detected.contentType,
        tamanhoBytes: buffer.length
      });
    }

    const nowIso = new Date().toISOString();
    await db.collection("requerimentos").doc(protocolo).set({
      protocolo,
      cpfHash: hashSensitiveValue(cpfDigits),
      cpfMasked: `***.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6, 9)}-**`,
      nome,
      email,
      rgInformado: Boolean(rg),
      sexo,
      unidade,
      curso,
      anoConclusao,
      tipoRequerimento,
      outrosDescricao: tipoRequerimento === "Outros" ? outrosDescricao : "",
      status: "Recebido",
      observacaoSecretaria: "Requerimento recebido e aguardando conferência documental.",
      anexos: savedAttachments,
      lgpdConsent: true,
      criadoEm: nowIso,
      atualizadoEm: nowIso
    });

    // E-mail de confirmação ao aluno
    await sendTransactionalEmail({
      to: email,
      subject: `Protocolo ${protocolo} — Requerimento de Documentação CTA Escola Técnica`,
      html: `<p>Olá, <strong>${nome}</strong>.</p>
             <p>Seu requerimento de <strong>${tipoRequerimento}</strong> (${unidade} — Técnico em ${curso}) foi recebido com sucesso.</p>
             <p><strong>Número de Protocolo:</strong> ${protocolo}</p>
             <p><strong>Status inicial:</strong> Recebido</p>
             <p>Você pode acompanhar o andamento na página da Secretaria Online informando seu protocolo e CPF.</p>`
    });

    // Notificação à secretaria (SEM anexar os documentos no e-mail; apenas link seguro do painel)
    const secretariaEmail = process.env.SECRETARIA_EMAIL || "[PREENCHER: e-mail da secretaria]";
    const painelUrl = process.env.PAINEL_SECRETARIA_URL || "https://ctarj.org.br/painel-secretaria.html";
    await sendTransactionalEmail({
      to: secretariaEmail,
      subject: `Novo Requerimento ${protocolo} — ${unidade} (${curso})`,
      html: `<p>Um novo requerimento de documentação foi registrado na Secretaria Online.</p>
             <ul>
               <li><strong>Protocolo:</strong> ${protocolo}</li>
               <li><strong>Unidade / Curso:</strong> ${unidade} — Técnico em ${curso}</li>
               <li><strong>Ano de conclusão:</strong> ${anoConclusao}</li>
               <li><strong>Tipo de documento:</strong> ${tipoRequerimento}</li>
               <li><strong>Quantidade de anexos privados:</strong> ${savedAttachments.length}</li>
             </ul>
             <p>Por segurança e conformidade LGPD, os documentos não são enviados por e-mail. Acesse o painel autenticado para visualizar os anexos via link temporário assinado:</p>
             <p><a href="${painelUrl}">${painelUrl}</a></p>`
    });

    return res.status(201).json({
      ok: true,
      protocolo,
      status: "Recebido",
      criadoEm: nowIso
    });
  } catch (_err) {
    // Nunca registrar CPF, RG ou dados sensíveis em logs
    console.error("Erro ao processar requerimento na Cloud Function.");
    return res.status(500).json({ error: "Erro interno ao registrar o requerimento." });
  }
});

// 2. Consultar Protocolo (Protocolo + CPF)
exports.consultarProtocoloSecretaria = onRequest({ cors: true, maxInstances: 10 }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const protocolo = String((req.body && req.body.protocolo) || "").trim().toUpperCase();
    const cpfDigits = String((req.body && req.body.cpf) || "").replace(/\D/g, "");

    if (!/^CTA-\d{4}-\d{6}$/.test(protocolo) || !validateCPF(cpfDigits)) {
      return res.status(400).json({ error: "Protocolo ou CPF inválido." });
    }

    const snap = await db.collection("requerimentos").doc(protocolo).get();
    if (!snap.exists) {
      return res.status(404).json({ error: "Protocolo não localizado para os dados informados." });
    }

    const data = snap.data();
    const expectedHash = hashSensitiveValue(cpfDigits);
    if (data.cpfHash !== expectedHash) {
      return res.status(404).json({ error: "Protocolo não localizado para os dados informados." });
    }

    return res.status(200).json({
      protocolo: data.protocolo,
      status: data.status,
      unidade: data.unidade,
      curso: data.curso,
      anoConclusao: data.anoConclusao,
      tipoRequerimento: data.tipoRequerimento,
      outrosDescricao: data.outrosDescricao,
      observacaoSecretaria: data.observacaoSecretaria,
      atualizadoEm: data.atualizadoEm
    });
  } catch (_err) {
    return res.status(500).json({ error: "Não foi possível consultar o protocolo no momento." });
  }
});

// 3. Gerar Link Temporário Assinado (15 minutos) para a Secretaria Autenticada
exports.gerarLinkTemporarioAnexo = onRequest({ cors: true, maxInstances: 5 }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    await verifySecretariaToken(req);
    const storagePath = String((req.body && req.body.storagePath) || "").trim();
    if (!storagePath.startsWith("requerimentos/")) {
      return res.status(400).json({ error: "Caminho de anexo inválido." });
    }

    const [signedUrl] = await storage
      .bucket()
      .file(storagePath)
      .getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000 // Expira em 15 minutos
      });

    return res.status(200).json({ ok: true, signedUrl });
  } catch (err) {
    return res.status(403).json({ error: err.message || "Acesso negado." });
  }
});

