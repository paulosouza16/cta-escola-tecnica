import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  HeartPulse,
  Laptop,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WHATSAPP =
  "https://wa.me/5521994368367?text=Ol%C3%A1%2C%20CTA!%20Gostaria%20de%20saber%20mais%20sobre%20os%20cursos.";

function PageHeader({ enrollHref = "/inscricao" }: { enrollHref?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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

        <nav
          id="mobile-navigation"
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          aria-label="Navegação principal"
        >
          <a href="/nossos-cursos" className="nav-link--active" onClick={() => setMenuOpen(false)}>
            Cursos
          </a>
          <a href="/#sobre" onClick={() => setMenuOpen(false)}>
            A CTA
          </a>
          <a href="/#comunidade" onClick={() => setMenuOpen(false)}>
            Comunidade
          </a>
          <a href="/#unidades" onClick={() => setMenuOpen(false)}>
            Unidades
          </a>
          <a href="/#contato" onClick={() => setMenuOpen(false)}>
            Contato
          </a>
          <a className="mobile-nav-apply" href={enrollHref}>
            Inscreva-se <ArrowUpRight size={16} />
          </a>
        </nav>

        <a className="header-cta" href={enrollHref}>
          Faça sua inscrição <ArrowUpRight size={16} strokeWidth={2} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Abrir ou fechar menu"
          title="Menu"
          onClick={() => setMenuOpen((open: boolean) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function PageFooter({ whatsappHref = WHATSAPP }: { whatsappHref?: string }) {
  return (
    <>
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
            <p>
              Formação profissional, conhecimento e novas possibilidades para o Rio de Janeiro.
            </p>
          </div>
          <div className="footer-links-col">
            <span className="footer-title">EXPLORE</span>
            <a href="/nossos-cursos">Nossos Cursos</a>
            <a href="/#sobre">A CTA</a>
            <a href="/#unidades">Unidades</a>
            <a href="/inscricao">
              Faça sua inscrição <ArrowUpRight size={13} />
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
          <span>
            © {new Date().getFullYear()} CTA – Escola Técnica. Centro de Tecnologia Aplicada.
          </span>
          <span>RIO DE JANEIRO · RJ</span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale com o CTA pelo WhatsApp"
      >
        <MessageCircle size={19} /> <span>Fale com o CTA</span>
      </a>
    </>
  );
}

export function NossosCursos() {
  return (
    <div className="site-shell" id="inicio">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <PageHeader />

      <main id="conteudo">
        <section className="enroll-hero" aria-labelledby="page-title">
          <div className="enroll-hero__inner">
            <div className="enroll-hero__copy">
              <p className="eyebrow eyebrow--light">
                <span />
                FORMAÇÃO PROFISSIONAL · CTA
              </p>
              <h1 id="page-title">
                Nossos <em>Cursos</em>
              </h1>
              <p className="enroll-hero__sub">
                Qualificação profissional para o mercado de trabalho e preparação sólida para o prosseguimento na Educação Superior.
              </p>
            </div>
            <nav className="enroll-breadcrumb" aria-label="Localização da página">
              <a href="/">Home</a>
              <span>&gt;</span>
              <span className="current">Nossos Cursos</span>
            </nav>
          </div>
        </section>

        <section className="enroll-section">
          <div className="catalog-intro">
            <div>
              <p className="eyebrow">
                <span />
                PROPOSTA PEDAGÓGICA
              </p>
              <h2>Educação técnica de qualidade para o mundo moderno.</h2>
              <p>
                O CTA atua na Educação Básica nos níveis Fundamental e Médio bem como na Educação de Jovens e Adultos (EJA) também nos níveis Fundamental e Médio,{" "}
                <strong>com foco em educação técnica de qualidade.</strong>
              </p>
              <p>
                Nosso compromisso é qualificar você para o mercado de trabalho bem como para prosseguimento na Educação Superior, afinal educar-se e manter-se atualizado é essencial no mundo moderno.
              </p>
            </div>
            <div className="catalog-intro__badges">
              <div className="catalog-badge">
                <span>MODALIDADES</span>
                <strong>Integrado ao Ensino Médio</strong>
              </div>
              <div className="catalog-badge">
                <span>PARA QUEM CURSA O MÉDIO</span>
                <strong>Concomitante</strong>
              </div>
              <div className="catalog-badge">
                <span>PÓS-MÉDIO</span>
                <strong>Subsequente</strong>
              </div>
              <div className="catalog-badge">
                <span>JOVENS E ADULTOS</span>
                <strong>Ensino Fundamental &amp; Médio (EJA)</strong>
              </div>
            </div>
          </div>

          <div className="catalog-cards">
            <article className="catalog-card">
              <div className="catalog-card__media">
                <img src="/curso-eletrotecnica.jpg" alt="Laboratório do curso Técnico em Eletrotécnica" />
                <span className="catalog-card__tag">01 · ENERGIA &amp; TECNOLOGIA</span>
              </div>
              <div className="catalog-card__body">
                <h3>Técnico em Eletrotécnica</h3>
                <p>
                  Capacitação completa para montar e instalar circuitos digitais e analógicos, desenvolver placas de circuito impresso e atuar com registro profissional.
                </p>
                <div className="catalog-card__modes">
                  <strong>Formas oferecidas</strong>
                  Integrado · Concomitante · Subsequente (Pós-Médio)
                </div>
                <div className="catalog-card__actions">
                  <a className="button button--navy" href="/tecnico-em-eletrotecnica">
                    Ver detalhes <ArrowRight size={14} />
                  </a>
                  <a className="button button--gold" href="/inscricao?curso=Eletrot%C3%A9cnica">
                    Inscrever-se
                  </a>
                </div>
              </div>
            </article>

            <article className="catalog-card">
              <div className="catalog-card__media">
                <img src="/curso-enfermagem.jpg" alt="Alunas do curso Técnico em Enfermagem da CTA" />
                <span className="catalog-card__tag">02 · SAÚDE &amp; CUIDADO</span>
              </div>
              <div className="catalog-card__body">
                <h3>Técnico em Enfermagem</h3>
                <p>
                  Formação humanizada e técnica para atuar em hospitais, clínicas e estabelecimentos de assistência médica, terapêutica, pediatria, obstetrícia e saúde ocupacional.
                </p>
                <div className="catalog-card__modes">
                  <strong>Formas oferecidas</strong>
                  Integrado · Concomitante · Subsequente (Pós-Médio)
                </div>
                <div className="catalog-card__actions">
                  <a className="button button--navy" href="/tecnico-em-enfermagem">
                    Ver detalhes <ArrowRight size={14} />
                  </a>
                  <a className="button button--gold" href="/inscricao?curso=Enfermagem">
                    Inscrever-se
                  </a>
                </div>
              </div>
            </article>

            <article className="catalog-card">
              <div className="catalog-card__media">
                <img src="/curso-informatica.jpg" alt="Alunos em prática de hardware e programação no curso Técnico em Informática" />
                <span className="catalog-card__tag">03 · COMPUTAÇÃO &amp; DIGITAL</span>
              </div>
              <div className="catalog-card__body">
                <h3>Técnico em Informática</h3>
                <p>
                  Desenvolvimento de programas para computadores com ênfase em ambiente WEB e software livre — segmento de alta empregabilidade na área tecnológica.
                </p>
                <div className="catalog-card__modes">
                  <strong>Formas oferecidas</strong>
                  Integrado · Concomitante · Subsequente (Pós-Médio)
                </div>
                <div className="catalog-card__actions">
                  <a className="button button--navy" href="/tecnico-em-informatica">
                    Ver detalhes <ArrowRight size={14} />
                  </a>
                  <a className="button button--gold" href="/inscricao?curso=Inform%C3%A1tica">
                    Inscrever-se
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="closing-cta" id="contato" aria-labelledby="closing-title">
          <div className="closing-cta__ornament" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="closing-cta__copy">
            <p className="eyebrow eyebrow--light">
              <span />
              COMO CHEGAR · UNIDADE BANGU
            </p>
            <h2 id="closing-title">
              Pronto para iniciar
              <br />
              <em>sua formação?</em>
            </h2>
            <p>
              Visite nossa unidade no Campus da Universidade Cândido Mendes em Bangu ou faça sua pré-inscrição online.
            </p>
            <div className="closing-actions">
              <a className="button button--gold" href="/inscricao">
                Faça já sua inscrição! <ArrowUpRight size={16} />
              </a>
              <a
                className="button button--outline"
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} /> Falar pelo WhatsApp
              </a>
            </div>
          </div>
          <div className="closing-cta__side">
            <span className="closing-cta__label">UNIDADE BANGU · RJ</span>
            <span className="closing-cta__big">
              Seu caminho.
              <br />
              Sua escolha.
            </span>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

interface CourseDetailData {
  slug: "eletrotecnica" | "enfermagem" | "informatica";
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  breadcrumbName: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  profileHeading: string;
  profileText: string;
  modalitiesCourseName: string;
  enrollCourseParam: string;
  whatsappText: string;
}

function CourseDetailLayout({ data }: { data: CourseDetailData }) {
  const Icon = data.icon;
  const allCourses = [
    {
      slug: "eletrotecnica",
      href: "/tecnico-em-eletrotecnica",
      label: "01 · Técnico em Eletrotécnica",
    },
    {
      slug: "enfermagem",
      href: "/tecnico-em-enfermagem",
      label: "02 · Técnico em Enfermagem",
    },
    {
      slug: "informatica",
      href: "/tecnico-em-informatica",
      label: "03 · Técnico em Informática",
    },
  ];

  const enrollHref = `/inscricao?curso=${encodeURIComponent(data.enrollCourseParam)}`;
  const courseWhatsapp = `https://wa.me/5521994368367?text=${encodeURIComponent(
    data.whatsappText
  )}`;

  return (
    <div className="site-shell" id="inicio">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <PageHeader enrollHref={enrollHref} />

      <main id="conteudo">
        <section className="enroll-hero" aria-labelledby="course-title">
          <div className="enroll-hero__inner">
            <div className="enroll-hero__copy">
              <p className="eyebrow eyebrow--light">
                <span />
                {data.eyebrow}
              </p>
              <h1 id="course-title">
                {data.titlePrefix} <em>{data.titleHighlight}</em>
              </h1>
              <p className="enroll-hero__sub">{data.subtitle}</p>
            </div>
            <nav className="enroll-breadcrumb" aria-label="Localização da página">
              <a href="/">Home</a>
              <span>&gt;</span>
              <a href="/nossos-cursos">Nossos Cursos</a>
              <span>&gt;</span>
              <span className="current">{data.breadcrumbName}</span>
            </nav>
          </div>
        </section>

        <section className="enroll-section">
          <div className="enroll-grid">
            <article className="course-detail-card">
              <div className="course-banner">
                <img src={data.imageSrc} alt={data.imageAlt} />
                <span className="course-banner__badge">
                  <Icon size={14} strokeWidth={2.2} />
                  FORMAÇÃO TÉCNICA DE NÍVEL MÉDIO
                </span>
              </div>

              <div className="course-detail-body">
                <div className="course-block">
                  <span className="course-block__eyebrow">PERFIL PROFISSIONAL</span>
                  <h2>{data.profileHeading}</h2>
                  <p>{data.profileText}</p>
                </div>

                <div className="course-block">
                  <span className="course-block__eyebrow">MODALIDADES DE ENSINO</span>
                  <h2>Formas de oferta no CTA</h2>
                  <p>
                    <strong>Todo curso técnico é considerado formação de nível médio</strong> e no CTA oferecemos o curso{" "}
                    {data.modalitiesCourseName} nas formas:
                  </p>
                  <div className="course-modes-grid">
                    <div className="course-mode-box">
                      <span>MODALIDADE 01</span>
                      <h3>Integrado ao Ensino Médio</h3>
                    </div>
                    <div className="course-mode-box">
                      <span>MODALIDADE 02</span>
                      <h3>Concomitante ao Ensino Médio</h3>
                    </div>
                    <div className="course-mode-box">
                      <span>MODALIDADE 03</span>
                      <h3>Subsequente ao Ensino Médio (Pós-Médio)</h3>
                    </div>
                  </div>
                </div>

                <div className="course-block">
                  <span className="course-block__eyebrow">PRÉ-REQUISITO</span>
                  <h2>Quem pode se matricular</h2>
                  <div className="course-prereq-list">
                    <div className="course-prereq-item">
                      <span className="course-prereq-item__icon">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <div>
                        <strong>Integrado ao Ensino Médio</strong>
                        <span>Ter concluído o Ensino Fundamental.</span>
                      </div>
                    </div>
                    <div className="course-prereq-item">
                      <span className="course-prereq-item__icon">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <div>
                        <strong>Concomitante ao Ensino Médio</strong>
                        <span>Estar cursando o Ensino Médio.</span>
                      </div>
                    </div>
                    <div className="course-prereq-item">
                      <span className="course-prereq-item__icon">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <div>
                        <strong>Subsequente ao Ensino Médio (Pós-Médio)</strong>
                        <span>Ter concluído o Ensino Médio.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="course-cta-bar">
                  <div>
                    <h3>Quer cursar {data.breadcrumbName}?</h3>
                    <p>Garanta sua pré-inscrição online e receba o atendimento da nossa equipe.</p>
                  </div>
                  <a className="button button--gold" href={enrollHref}>
                    Fazer inscrição neste curso <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>

            <aside className="enroll-aside" aria-label="Navegação de cursos e contato">
              <div className="other-courses-nav">
                <h4>Nossos Cursos Técnicos</h4>
                <div className="other-courses-links">
                  {allCourses.map((c) => {
                    const active = c.slug === data.slug;
                    return (
                      <a
                        key={c.slug}
                        className={`other-course-link${active ? " other-course-link--active" : ""}`}
                        href={c.href}
                      >
                        <span>{c.label}</span>
                        {active ? <span>Atual</span> : <ArrowRight size={14} />}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="enroll-aside-card">
                <span className="enroll-aside-card__tag">UNIDADE · ZONA OESTE</span>
                <h3>Bangu</h3>
                <p>
                  Campus da Universidade Cândido Mendes. Consulte disponibilidade de turmas e turnos para {data.enrollCourseParam}.
                </p>
                <div className="enroll-contact-list">
                  <a href="tel:+552134493572">
                    <Phone size={15} /> (21) 3449-3572
                  </a>
                  <a href={courseWhatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={15} /> WhatsApp: (21) 99436-8367
                  </a>
                  <a href="mailto:faleconosco@ctarj.org.br">
                    <Mail size={15} /> faleconosco@ctarj.org.br
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <PageFooter whatsappHref={courseWhatsapp} />
    </div>
  );
}

export function CursoEletrotecnica() {
  return (
    <CourseDetailLayout
      data={{
        slug: "eletrotecnica",
        eyebrow: "CURSO TÉCNICO · ENERGIA & TECNOLOGIA",
        titlePrefix: "Técnico em",
        titleHighlight: "Eletrotécnica",
        subtitle:
          "Uma formação conectada a instalações, circuitos digitais e analógicos, sistemas e soluções elétricas.",
        breadcrumbName: "Técnico em Eletrotécnica",
        imageSrc: "/curso-eletrotecnica.jpg",
        imageAlt: "Aula prática de laboratório do curso Técnico em Eletrotécnica na CTA",
        icon: Zap,
        profileHeading: "Competência prática e registro profissional",
        profileText:
          "Com registro profissional, emitido pelo Conselho Regional de Engenharia e Arquitetura, CREA-RJ, o profissional Técnico em Eletrotécnica terá capacidade de montar e instalar circuitos digitais e analógicos de acordo com as diretrizes propostas pelos esquemas dos fabricantes dos equipamentos, além de reunir as competências para desenvolver e analisar placas de circuito impresso e suas técnicas de construção e soldagem de componentes eletrônicos, nelas instalados.",
        modalitiesCourseName: "Técnico em Eletrotécnica",
        enrollCourseParam: "Eletrotécnica",
        whatsappText: "Olá, CTA! Gostaria de saber mais sobre o curso Técnico em Eletrotécnica.",
      }}
    />
  );
}

export function CursoEnfermagem() {
  return (
    <CourseDetailLayout
      data={{
        slug: "enfermagem",
        eyebrow: "CURSO TÉCNICO · SAÚDE & CUIDADO",
        titlePrefix: "Técnico em",
        titleHighlight: "Enfermagem",
        subtitle:
          "Conhecimento técnico, responsabilidade e preparação completa para atuar no cuidado e na assistência em saúde.",
        breadcrumbName: "Técnico em Enfermagem",
        imageSrc: "/curso-enfermagem.jpg",
        imageAlt: "Alunas do curso Técnico em Enfermagem da CTA Escola Técnica",
        icon: HeartPulse,
        profileHeading: "Assistência técnica e humanizada em saúde",
        profileText:
          "Através de proposta inovadora, este profissional estará apto a desempenhar atividades técnicas de enfermagem em hospitais, clínicas e outros estabelecimentos de assistência médica e terapêutica, puericultura, pediatria, psiquiatria, obstetrícia, saúde ocupacional e outras áreas afins prestando assistência ao paciente. Realiza registros e elabora relatórios técnicos.",
        modalitiesCourseName: "Técnico em Enfermagem",
        enrollCourseParam: "Enfermagem",
        whatsappText: "Olá, CTA! Gostaria de saber mais sobre o curso Técnico em Enfermagem.",
      }}
    />
  );
}

export function CursoInformatica() {
  return (
    <CourseDetailLayout
      data={{
        slug: "informatica",
        eyebrow: "CURSO TÉCNICO · COMPUTAÇÃO & DIGITAL",
        titlePrefix: "Técnico em",
        titleHighlight: "Informática",
        subtitle:
          "Tecnologia, programação e desenvolvimento voltados para ambiente WEB e software livre.",
        breadcrumbName: "Técnico em Informática",
        imageSrc: "/curso-informatica.jpg",
        imageAlt: "Alunos do curso Técnico em Informática em aula prática na CTA",
        icon: Laptop,
        profileHeading: "Desenvolvimento de sistemas e tecnologias WEB",
        profileText:
          "O Profissional Técnico em Informática formado por nossas Escolas será responsável pela execução de tarefas ligadas à concepção de programas para computadores, com ênfase em ambiente de INTERNET (WEB), voltado para software livre, face ser este segmento o de maior coeficiente de empregabilidade para formação técnica, nesta área.",
        modalitiesCourseName: "Técnico em Informática",
        enrollCourseParam: "Informática",
        whatsappText: "Olá, CTA! Gostaria de saber mais sobre o curso Técnico em Informática.",
      }}
    />
  );
}
