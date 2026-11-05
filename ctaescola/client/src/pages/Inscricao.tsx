import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";

const OFFICIAL = "https://ctarj.org.br";
const WHATSAPP = "https://wa.me/5521994368367?text=Ol%C3%A1%2C%20CTA!%20Gostaria%20de%20saber%20mais%20sobre%20os%20cursos.";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
  }
  if (digits.length > 2) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length > 0) {
    return `(${digits}`;
  }
  return "";
}

export default function Inscricao() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [segmento, setSegmento] = useState("");
  const [curso, setCurso] = useState("");
  const [comoConheceu, setComoConheceu] = useState("");

  const [errors, setErrors] = useState<{ nome?: boolean; email?: boolean; curso?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nomeTrim = nome.trim();
    const emailTrim = email.trim();
    const emailConfirmTrim = emailConfirm.trim();

    const nextErrors: { nome?: boolean; email?: boolean; curso?: boolean } = {};
    if (!nomeTrim) nextErrors.nome = true;
    if (
      emailTrim.length <= 3 ||
      !emailTrim.includes("@") ||
      emailTrim.toLowerCase() !== emailConfirmTrim.toLowerCase()
    ) {
      nextErrors.email = true;
    }
    if (!curso) nextErrors.curso = true;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  }

  function handleReset() {
    setNome("");
    setEmail("");
    setEmailConfirm("");
    setTelefone("");
    setSegmento("");
    setCurso("");
    setComoConheceu("");
    setErrors({});
    setSubmitted(false);
  }

  const msgLines = [
    "Olá, CTA! Gostaria de realizar minha inscrição:",
    `• Nome: ${nome.trim()}`,
    `• E-mail: ${email.trim()}`,
    telefone.trim() ? `• Telefone: ${telefone.trim()}` : null,
    segmento ? `• Segmento: ${segmento}` : null,
    `• Curso de interesse: ${curso}`,
    comoConheceu ? `• Como conheceu: ${comoConheceu}` : null,
  ].filter(Boolean);

  const textEncoded = encodeURIComponent(msgLines.join("\n"));
  const whatsappHref = `https://wa.me/5521994368367?text=${textEncoded}`;
  const mailtoHref = `mailto:faleconosco@ctarj.org.br?subject=${encodeURIComponent(
    `Nova Inscrição CTA — ${nome.trim()} (${curso})`
  )}&body=${textEncoded}`;

  return (
    <div className="site-shell" id="inicio">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="CTA Escola Técnica — início">
            <img
              className="brand__logo"
              src="/logo-cta-amarela.png"
              alt="CTA — Escola Técnica"
              width="174"
              height="48"
            />
          </a>

          <nav id="mobile-navigation" className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Navegação principal">
            <a href="/#cursos" onClick={() => setMenuOpen(false)}>Cursos</a>
            <a href="/#sobre" onClick={() => setMenuOpen(false)}>A CTA</a>
            <a href="/#unidades" onClick={() => setMenuOpen(false)}>Unidades</a>
            <a href="/#contato" onClick={() => setMenuOpen(false)}>Contato</a>
            <a className="mobile-nav-apply" href="/">
              Voltar ao início <ChevronLeft size={16} />
            </a>
          </nav>

          <a className="header-cta" href="/">
            Voltar ao início <ArrowRight size={16} strokeWidth={2} />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open: boolean) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="conteudo">
        <section className="enroll-hero" aria-labelledby="enroll-title">
          <div className="enroll-hero__inner">
            <div className="enroll-hero__copy">
              <p className="eyebrow eyebrow--light"><span />MATRÍCULAS &amp; PRÉ-INSCRIÇÃO</p>
              <h1 id="enroll-title">Faça já sua <em>inscrição!</em></h1>
              <p className="enroll-hero__sub">
                Preencha seus dados abaixo para registrar seu interesse. Nossa equipe de atendimento entrará em contato para orientar você sobre turmas, horários e documentação.
              </p>
            </div>
            <nav className="enroll-breadcrumb" aria-label="Localização da página">
              <a href="/">Home</a>
              <span>&gt;</span>
              <span className="current">Faça já sua inscrição!</span>
            </nav>
          </div>
        </section>

        <section className="enroll-section">
          <div className="enroll-grid">
            <div className="enroll-card">
              <div className="enroll-card__head">
                <h2>Formulário de Inscrição</h2>
                <p>Campos marcados com <span className="required-legend">*</span> são de preenchimento obrigatório.</p>
              </div>

              {submitted ? (
                <div className="enroll-success" role="status" aria-live="polite">
                  <span className="enroll-success__badge">
                    <Check size={14} strokeWidth={2.5} /> INSCRIÇÃO REGISTRADA
                  </span>
                  <h3>Recebemos os seus dados!</h3>
                  <p>
                    Sua solicitação de inscrição foi preparada com sucesso. Para atendimento imediato pela secretaria da unidade Bangu, confirme o envio direto pelo WhatsApp ou e-mail abaixo:
                  </p>
                  <div className="enroll-summary">
                    <div><strong>Nome:</strong> {nome}</div>
                    <div><strong>E-mail:</strong> {email}</div>
                    {telefone && <div><strong>Telefone:</strong> {telefone}</div>}
                    {segmento && <div><strong>Segmento:</strong> {segmento}</div>}
                    <div><strong>Curso de interesse:</strong> {curso}</div>
                    {comoConheceu && <div><strong>Como nos conheceu:</strong> {comoConheceu}</div>}
                  </div>
                  <div className="enroll-success__actions">
                    <a
                      className="button button--gold"
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} /> Concluir via WhatsApp
                    </a>
                    <a className="button button--navy" href={mailtoHref}>
                      Enviar por E-mail
                    </a>
                    <button type="button" className="button" onClick={handleReset}>
                      Nova inscrição
                    </button>
                  </div>
                </div>
              ) : (
                <form className="enroll-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-field">
                    <label className="form-label" htmlFor="nome">
                      Nome <span className="req">*</span>
                    </label>
                    <input
                      className={`form-input${errors.nome ? " form-input--error" : ""}`}
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Nome Completo"
                      value={nome}
                      onChange={(e: any) => setNome(e.target.value)}
                      required
                    />
                    {errors.nome && (
                      <span className="form-error">Por favor, informe seu nome completo.</span>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="email">
                      Email <span className="req">*</span>
                    </label>
                    <div className="form-row">
                      <div className="form-field">
                        <input
                          className={`form-input${errors.email ? " form-input--error" : ""}`}
                          type="email"
                          id="email"
                          name="email"
                          placeholder="seuemail@exemplo.com"
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                          required
                        />
                        <span className="form-hint">E-mail</span>
                      </div>
                      <div className="form-field">
                        <input
                          className={`form-input${errors.email ? " form-input--error" : ""}`}
                          type="email"
                          id="emailConfirm"
                          name="emailConfirm"
                          placeholder="Repita seu e-mail"
                          value={emailConfirm}
                          onChange={(e: any) => setEmailConfirm(e.target.value)}
                          required
                        />
                        <span className="form-hint">Confirmar e-mail</span>
                      </div>
                    </div>
                    {errors.email && (
                      <span className="form-error">
                        Verifique se os dois campos de e-mail estão preenchidos e iguais.
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="telefone">
                      Telefone/Celular
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      id="telefone"
                      name="telefone"
                      placeholder="Digite o seu número — ex.: (21) 99999-9999"
                      value={telefone}
                      onChange={(e: any) => setTelefone(formatPhone(e.target.value))}
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="segmento">
                      Segmento
                    </label>
                    <select
                      className="form-select"
                      id="segmento"
                      name="segmento"
                      value={segmento}
                      onChange={(e: any) => setSegmento(e.target.value)}
                    >
                      <option value="">Escolha o segmento</option>
                      <option value="Ensino Médio Técnico">Ensino Médio Técnico</option>
                      <option value="Técnico de nível médio / Pós-Médio">Técnico de nível médio / Pós-Médio</option>
                      <option value="Especialização Técnica">Especialização Técnica</option>
                      <option value="Qualificação Profissional">Qualificação Profissional</option>
                      <option value="Ensino Médio Geral & EJA">Ensino Médio Geral &amp; EJA</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="curso">
                      Curso de interesse <span className="req">*</span>
                    </label>
                    <select
                      className={`form-select${errors.curso ? " form-select--error" : ""}`}
                      id="curso"
                      name="curso"
                      value={curso}
                      onChange={(e: any) => setCurso(e.target.value)}
                      required
                    >
                      <option value="">Selecione o curso</option>
                      <option value="Eletrotécnica">Eletrotécnica</option>
                      <option value="Enfermagem">Enfermagem</option>
                      <option value="Informática">Informática</option>
                    </select>
                    {errors.curso && (
                      <span className="form-error">Por favor, selecione o curso de interesse.</span>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="comoConheceu">
                      Como nos conheceu?
                    </label>
                    <select
                      className="form-select"
                      id="comoConheceu"
                      name="comoConheceu"
                      value={comoConheceu}
                      onChange={(e: any) => setComoConheceu(e.target.value)}
                    >
                      <option value="">Marque a opção</option>
                      <option value="Google / Pesquisa na Internet">Google / Pesquisa na Internet</option>
                      <option value="Instagram / Redes Sociais">Instagram / Redes Sociais</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Indicação de amigo ou familiar">Indicação de amigo ou familiar</option>
                      <option value="Passando em frente à unidade">Passando em frente à unidade</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div className="enroll-submit-row">
                    <span className="enroll-submit-note">
                      Seus dados serão direcionados exclusivamente à equipe de atendimento da CTA Escola Técnica.
                    </span>
                    <button type="submit" className="button button--gold enroll-submit-btn">
                      Enviar <ArrowRight size={16} strokeWidth={2.2} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <aside className="enroll-aside" aria-label="Informações de atendimento">
              <div className="enroll-aside-card">
                <span className="enroll-aside-card__tag">UNIDADE · ZONA OESTE</span>
                <h3>Bangu</h3>
                <p>
                  Campus da Universidade Cândido Mendes. Atendimento presencial e suporte direto para novos alunos.
                </p>
                <div className="enroll-contact-list">
                  <a href="tel:+552134493572">
                    <Phone size={15} /> (21) 3449-3572
                  </a>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={15} /> WhatsApp: (21) 99436-8367
                  </a>
                  <a href="mailto:faleconosco@ctarj.org.br">
                    <Mail size={15} /> faleconosco@ctarj.org.br
                  </a>
                </div>
              </div>

              <div className="enroll-highlights">
                <h4>Por que escolher a CTA?</h4>
                <ul>
                  <li>
                    <span className="check-badge"><Check size={12} strokeWidth={3} /></span>
                    <span>Formação técnica em <strong>Eletrotécnica, Enfermagem e Informática</strong> conectada ao mercado.</span>
                  </li>
                  <li>
                    <span className="check-badge"><Check size={12} strokeWidth={3} /></span>
                    <span>Histórico de <strong>projetos premiados desde 2002</strong> em mostras tecnológicas.</span>
                  </li>
                  <li>
                    <span className="check-badge"><Check size={12} strokeWidth={3} /></span>
                    <span>Aulas práticas em laboratório e diferentes modalidades de ensino.</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <a className="brand" href="/" aria-label="CTA Escola Técnica — início">
              <img
                className="brand__logo"
                src="/logo-cta-branca.png"
                alt="CTA — Escola Técnica"
                width="174"
                height="48"
              />
            </a>
            <p>Formação profissional, conhecimento e novas possibilidades para o Rio de Janeiro.</p>
          </div>
          <div className="footer-links-col">
            <span className="footer-title">EXPLORE</span>
            <a href="/#cursos">Cursos</a>
            <a href="/#sobre">A CTA</a>
            <a href="/#unidades">Unidades</a>
            <a href={`${OFFICIAL}/nossos-cursos/`} target="_blank" rel="noopener noreferrer">
              Site oficial <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="footer-links-col footer-contact-col">
            <span className="footer-title">FALE COM A GENTE</span>
            <a href="tel:+552134493572">(21) 3449-3572</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              WhatsApp: (21) 99436-8367 <ArrowUpRight size={13} />
            </a>
            <a href="mailto:faleconosco@ctarj.org.br">
              faleconosco@ctarj.org.br <ArrowUpRight size={13} />
            </a>
          </div>
          <a className="footer-top" href="#inicio" aria-label="Voltar ao início">
            <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CTA – Escola Técnica. Centro de Tecnologia Aplicada.</span>
          <span>RIO DE JANEIRO · RJ</span>
        </div>
      </footer>

      <a className="whatsapp-float" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Fale com o CTA pelo WhatsApp">
        <MessageCircle size={19} /> <span>Fale com o CTA</span>
      </a>
    </div>
  );
}

