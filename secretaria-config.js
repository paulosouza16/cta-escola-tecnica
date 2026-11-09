/**
 * ============================================================================
 * CONFIGURAÇÃO ÚNICA — SECRETARIA ONLINE (FASE B)
 * CTA Escola Técnica (Rio de Janeiro)
 * ============================================================================
 * Edite este arquivo para alterar:
 * 1) A lista de Tipos de Requerimento disponíveis no formulário;
 * 2) A lista de Documentos/Anexos obrigatórios por sexo;
 * 3) Os limites de tamanho, formatos aceitos e endpoints do Firebase;
 * 4) Os placeholders institucionais pendentes de preenchimento.
 */
window.CTA_SECRETARIA_CONFIG = {
  // Endpoints das Cloud Functions do Firebase (substituir após o deploy)
  endpoints: {
    criarRequerimento: "[PREENCHER: URL da Cloud Function criarRequerimentoSecretaria no Firebase]",
    consultarProtocolo: "[PREENCHER: URL da Cloud Function consultarProtocoloSecretaria no Firebase]",
    listarRequerimentos: "[PREENCHER: URL da Cloud Function listarRequerimentosSecretaria no Firebase]",
    atualizarStatus: "[PREENCHER: URL da Cloud Function atualizarStatusRequerimento no Firebase]",
    gerarLinkAnexo: "[PREENCHER: URL da Cloud Function gerarLinkTemporarioAnexo no Firebase]"
  },

  // Configuração pública do Firebase Web SDK (usada no Painel e nos serviços da Secretaria)
  firebaseClientConfig: {
    apiKey: "AIzaSyD6cNGS3c-lDiAFtVeYs7o6Qh28K1JGcpQ",
    authDomain: "cta-escola-tecnica-rj.firebaseapp.com",
    projectId: "cta-escola-tecnica-rj",
    storageBucket: "cta-escola-tecnica-rj.firebasestorage.app",
    messagingSenderId: "821562950822",
    appId: "1:821562950822:web:cd79c331419e4eca356067"
  },

  // Textos e parâmetros institucionais com placeholders visíveis (Regra 1)
  institucional: {
    emailSecretaria: "[PREENCHER: e-mail da secretaria]",
    prazoEmissaoTexto: "[PREENCHER: prazo de análise e emissão dos documentos]",
    prazoRetencaoDados: "[PREENCHER: definir com a escola]",
    urlPoliticaPrivacidade: "[PREENCHER: URL da Política de Privacidade]",
    horarioAtendimentoSecretaria: "[PREENCHER: horário de atendimento presencial da secretaria]"
  },

  // Regras de Upload de Anexos
  upload: {
    limiteTamanhoTexto: "[PREENCHER: ex. 5 MB]",
    limiteTamanhoBytes: 5 * 1024 * 1024, // 5 MB padrão técnico até confirmação final
    extensoesPermitidas: [".pdf", ".jpg", ".jpeg", ".png"],
    mimeTypesPermitidos: ["application/pdf", "image/jpeg", "image/png"],
    formatosLegiveis: "PDF, JPG ou PNG"
  },

  // Regra de Negócio Crítica: Unidades e Cursos permitidos
  unidadesCursos: {
    "Bangu": ["Eletrotécnica", "Enfermagem", "Informática"],
    "Campo Grande": ["Eletrotécnica", "Informática"]
  },

  // Lista fácil de editar com os Tipos de Requerimento
  tiposRequerimento: [
    {
      valor: "Histórico escolar",
      rotulo: "Histórico escolar",
      exigeDescricao: false
    },
    {
      valor: "Certificado",
      rotulo: "Certificado",
      exigeDescricao: false
    },
    {
      valor: "Diploma",
      rotulo: "Diploma",
      exigeDescricao: false
    },
    {
      valor: "Declaração",
      rotulo: "Declaração",
      exigeDescricao: false
    },
    {
      valor: "Outros",
      rotulo: "Outros (especificar)",
      exigeDescricao: true
    }
  ],

  // Lista de Anexos exigidos (filtrada dinamicamente conforme o campo "sexo")
  anexos: [
    {
      id: "certidao_nascimento",
      rotulo: "1. Certidão de nascimento",
      descricao: "Documento legível, frente e verso (se houver averbações).",
      obrigatorioParaSexo: ["Masculino", "Feminino"]
    },
    {
      id: "rg_cpf",
      rotulo: "2. RG e CPF (com validade)",
      descricao: "Documento de identidade oficial com foto dentro da validade e CPF.",
      obrigatorioParaSexo: ["Masculino", "Feminino"]
    },
    {
      id: "comprovante_residencia",
      rotulo: "3. Comprovante de residência",
      descricao: "Conta de consumo recente (água, luz, telefone ou internet) com CEP.",
      obrigatorioParaSexo: ["Masculino", "Feminino"]
    },
    {
      id: "historico_escolar_anterior",
      rotulo: "4. Histórico escolar anterior (autenticado)",
      descricao: "Histórico escolar do Ensino Médio ou equivalente devidamente autenticado.",
      obrigatorioParaSexo: ["Masculino", "Feminino"]
    },
    {
      id: "certificado_reservista",
      rotulo: "5. Certificado de reservista",
      descricao: "Certificado de Alistamento Militar, Dispensa de Incorporação ou Reservista (obrigatório para o sexo masculino).",
      obrigatorioParaSexo: ["Masculino"]
    }
  ],

  // Status possíveis para acompanhamento de protocolo
  statusProtocolo: [
    {
      codigo: "Recebido",
      rotulo: "Recebido",
      descricao: "Seu requerimento foi registrado no sistema e aguarda conferência inicial da secretaria."
    },
    {
      codigo: "Em análise",
      rotulo: "Em análise",
      descricao: "A secretaria está conferindo os documentos anexados e o registro acadêmico."
    },
    {
      codigo: "Pendente de documentos",
      rotulo: "Pendente de documentos",
      descricao: "Há uma pendência na documentação enviada. Verifique a observação da secretaria abaixo."
    },
    {
      codigo: "Concluído",
      rotulo: "Concluído",
      descricao: "Seu documento foi emitido ou sua solicitação foi finalizada pela secretaria."
    }
  ]
};

