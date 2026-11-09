/**
 * BACK-END SERVERLESS — BOLSÃO DO CTA (Google Apps Script)
 *
 * Funcionalidades:
 * 1. Valida no back-end a regra crítica Unidade x Curso:
 *    - Bangu: Eletrotécnica, Enfermagem, Informática.
 *    - Campo Grande: SOMENTE Eletrotécnica e Informática (rejeita Enfermagem).
 * 2. Valida CPF matematicamente (candidato e responsável).
 * 3. Exige dados completos do responsável quando o candidato é menor de 18 anos.
 * 4. Bloqueia spam via campo honeypot (website_url).
 * 5. Evita inscrições duplicadas (mesmo CPF + mesma edição do Bolsão).
 * 6. Gera número de inscrição único, salva na planilha, envia e-mail de confirmação
 *    ao candidato e notifica a secretaria ([PREENCHER: e-mail da secretaria]).
 *
 * Credenciais/Configurações (armazenadas em Propriedades do Script — sem segredos no código):
 * - SECRETARIA_EMAIL: e-mail da secretaria para notificações
 * - SPREADSHEET_ID: ID da planilha Google onde as inscrições serão salvas
 * - BOLSAO_EDICAO_PADRAO: código da edição atual (ex.: BOLSAO-CTA-2026)
 */

var ALLOWED_COURSES_BY_UNIT = {
  "Bangu": ["Eletrotécnica", "Enfermagem", "Informática"],
  "Campo Grande": ["Eletrotécnica", "Informática"]
};

function onlyDigits(val) {
  return String(val || "").replace(/\D/g, "");
}

function isValidCPF(raw) {
  var cpf = onlyDigits(raw);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  var sum = 0;
  for (var i = 0; i < 9; i++) {
    sum += Number(cpf.charAt(i)) * (10 - i);
  }
  var rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== Number(cpf.charAt(9))) return false;

  sum = 0;
  for (var j = 0; j < 10; j++) {
    sum += Number(cpf.charAt(j)) * (11 - j);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === Number(cpf.charAt(10));
}

function calculateAge(dateStr) {
  if (!dateStr) return null;
  var parts = String(dateStr).split("-");
  if (parts.length !== 3) return null;
  var birth = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  if (isNaN(birth.getTime())) return null;
  var today = new Date();
  var age = today.getFullYear() - birth.getFullYear();
  var m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var body = JSON.parse(e && e.postData && e.postData.contents ? e.postData.contents : "{}");

    // 1. Proteção anti-spam (honeypot)
    if (body.website_url && String(body.website_url).trim() !== "") {
      return jsonResponse({ ok: false, error: "Envio bloqueado pelo filtro anti-spam." });
    }

    // 2. Validação de dados pessoais
    var nome = String(body.nome || "").trim();
    var dataNascimento = String(body.dataNascimento || "").trim();
    var cpf = String(body.cpf || "").trim();
    var cpfLimpo = onlyDigits(cpf);
    var email = String(body.email || "").trim();
    var whatsapp = String(body.whatsapp || "").trim();
    var unidade = String(body.unidade || "").trim();
    var curso = String(body.curso || "").trim();
    var escolaridade = String(body.escolaridade || "").trim();
    var consentimentoLgpd = Boolean(body.consentimentoLgpd);

    if (nome.split(/\s+/).length < 2) {
      return jsonResponse({ ok: false, error: "Informe o nome completo do candidato." });
    }
    var idade = calculateAge(dataNascimento);
    if (idade === null || idade < 10 || idade > 100) {
      return jsonResponse({ ok: false, error: "Data de nascimento inválida." });
    }
    if (!isValidCPF(cpfLimpo)) {
      return jsonResponse({ ok: false, error: "CPF do candidato inválido." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, error: "E-mail inválido." });
    }
    if (onlyDigits(whatsapp).length < 10) {
      return jsonResponse({ ok: false, error: "WhatsApp do candidato inválido." });
    }

    // 3. Validação de menor de 18 anos (Responsável obrigatório)
    var resp = body.responsavel || {};
    var respNome = String(resp.nome || "").trim();
    var respCpf = String(resp.cpf || "").trim();
    var respCpfLimpo = onlyDigits(respCpf);
    var respWhatsapp = String(resp.whatsapp || "").trim();

    if (idade < 18) {
      if (respNome.split(/\s+/).length < 2) {
        return jsonResponse({ ok: false, error: "Para menores de 18 anos, o nome completo do responsável é obrigatório." });
      }
      if (!isValidCPF(respCpfLimpo) || respCpfLimpo === cpfLimpo) {
        return jsonResponse({ ok: false, error: "Informe um CPF válido para o responsável (diferente do CPF do candidato)." });
      }
      if (onlyDigits(respWhatsapp).length < 10) {
        return jsonResponse({ ok: false, error: "WhatsApp do responsável inválido." });
      }
    }

    // 4. REGRA CRÍTICA DE NEGÓCIO: Unidade x Curso
    var allowedCourses = ALLOWED_COURSES_BY_UNIT[unidade];
    if (!allowedCourses) {
      return jsonResponse({ ok: false, error: "Unidade inválida. Escolha Bangu ou Campo Grande." });
    }
    if (allowedCourses.indexOf(curso) === -1) {
      return jsonResponse({
        ok: false,
        error: "O curso " + curso + " não é oferecido na unidade " + unidade + ". Em Campo Grande estão disponíveis apenas Eletrotécnica e Informática."
      });
    }
    if (!escolaridade) {
      return jsonResponse({ ok: false, error: "Informe a escolaridade atual." });
    }
    if (!consentimentoLgpd) {
      return jsonResponse({ ok: false, error: "O consentimento LGPD é obrigatório." });
    }

    // 5. Verificação de inscrição duplicada (mesmo CPF + mesmo Bolsão)
    var props = PropertiesService.getScriptProperties();
    var edicaoBolsao = String(body.edicaoBolsao || props.getProperty("BOLSAO_EDICAO_PADRAO") || "[PREENCHER: código da edição]").trim();
    var spreadsheetId = props.getProperty("SPREADSHEET_ID");
    var sheet = spreadsheetId
      ? SpreadsheetApp.openById(spreadsheetId).getSheets()[0]
      : SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Protocolo", "Data/Hora", "Edição Bolsão", "CPF (Números)", "Nome Candidato",
        "Data Nascimento", "Idade", "E-mail", "WhatsApp", "Nome Responsável",
        "CPF Responsável", "WhatsApp Responsável", "Unidade", "Curso",
        "Escolaridade", "Consentimento LGPD"
      ]);
    } else {
      var rows = sheet.getDataRange().getValues();
      for (var r = 1; r < rows.length; r++) {
        var rowEdicao = String(rows[r][2] || "").trim();
        var rowCpf = onlyDigits(rows[r][3]);
        if (rowEdicao === edicaoBolsao && rowCpf === cpfLimpo) {
          return jsonResponse({
            ok: false,
            error: "Já existe uma inscrição confirmada para este CPF nesta edição do Bolsão (Protocolo: " + rows[r][0] + ")."
          });
        }
      }
    }

    // 6. Geração de protocolo único e gravação
    var protocolo = "CTA-BOL-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
    var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    sheet.appendRow([
      protocolo, timestamp, edicaoBolsao, cpfLimpo, nome,
      dataNascimento, idade, email, whatsapp, respNome,
      respCpf, respWhatsapp, unidade, curso,
      escolaridade, consentimentoLgpd ? "SIM" : "NÃO"
    ]);

    // 7. Envio de e-mail de confirmação ao candidato e notificação à secretaria
    var secretariaEmail = props.getProperty("SECRETARIA_EMAIL") || "[PREENCHER: e-mail da secretaria]";

    MailApp.sendEmail({
      to: email,
      subject: "Confirmação de Inscrição no Bolsão do CTA — Protocolo " + protocolo,
      body: [
        "Olá, " + nome + "!",
        "",
        "Sua inscrição no Bolsão do CTA Escola Técnica foi registrada com sucesso.",
        "",
        "• Número de inscrição (Protocolo): " + protocolo,
        "• Edição: " + edicaoBolsao,
        "• Unidade: " + unidade,
        "• Curso pretendido: Técnico em " + curso,
        "• Data da prova: [PREENCHER: data da prova] às [PREENCHER: horário da prova]",
        "",
        "Guarde este número de protocolo e apresente documento oficial com foto no dia da prova.",
        "",
        "Atenciosamente,",
        "CTA – Escola Técnica (Rio de Janeiro)"
      ].join("\n")
    });

    if (secretariaEmail.indexOf("[PREENCHER") === -1) {
      MailApp.sendEmail({
        to: secretariaEmail,
        subject: "[Nova Inscrição Bolsão CTA] " + protocolo + " — " + nome + " (" + unidade + " / " + curso + ")",
        body: [
          "Nova inscrição registrada no Bolsão do CTA:",
          "",
          "• Protocolo: " + protocolo,
          "• Data/Hora: " + timestamp,
          "• Candidato: " + nome + " (CPF: " + cpf + " | Idade: " + idade + " anos)",
          "• E-mail: " + email,
          "• WhatsApp: " + whatsapp,
          respNome ? "• Responsável: " + respNome + " (CPF: " + respCpf + " | WhatsApp: " + respWhatsapp + ")" : "• Responsável: Não aplicável (maior de 18 anos)",
          "• Unidade: " + unidade,
          "• Curso: Técnico em " + curso,
          "• Escolaridade: " + escolaridade
        ].join("\n")
      });
    }

    return jsonResponse({ ok: true, protocolo: protocolo, timestamp: timestamp });
  } catch (err) {
    return jsonResponse({ ok: false, error: "Erro interno ao processar a inscrição: " + err.message });
  } finally {
    lock.releaseLock();
  }
}

