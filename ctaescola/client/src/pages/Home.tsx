/// <reference path="../platform.d.ts" />
import React, { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Laptop,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  Quote,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const APPLY = "/inscricao";
const WHATSAPP = "https://wa.me/5521994368367?text=Ol%C3%A1%2C%20CTA!%20Gostaria%20de%20saber%20mais%20sobre%20os%20cursos.";

const courses: {
  number: string;
  name: string;
  category: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    number: "01",
    name: "Eletrotécnica",
    category: "ENERGIA & TECNOLOGIA",
    description: "Uma formação conectada a instalações, sistemas e soluções elétricas.",
    href: "/tecnico-em-eletrotecnica",
    icon: Zap,
    color: "violet",
  },
  {
    number: "02",
    name: "Enfermagem",
    category: "SAÚDE & CUIDADO",
    description: "Conhecimento técnico e responsabilidade no campo da saúde.",
    href: "/tecnico-em-enfermagem",
    icon: HeartPulse,
    color: "coral",
  },
  {
    number: "03",
    name: "Informática",
    category: "COMPUTAÇÃO & DIGITAL",
    description: "Tecnologia e computação para ampliar suas possibilidades profissionais.",
    href: "/tecnico-em-informatica",
    icon: Laptop,
    color: "mint",
  },
];

const heroSlides = [
  {
    src: "/hero-slide-1.jpg",
    alt: "Estudantes do CTA Escola Técnica em aula prática no laboratório de informática",
  },
  {
    src: "/hero-slide-2.jpg",
    alt: "Alunos do CTA colaborando em atividades práticas em laboratório",
  },
  {
    src: "/hero-slide-3.jpg",
    alt: "Desenvolvimento de código e programação na prática no CTA Escola Técnica",
  },
];

const navItems = [
  { label: "Cursos", href: "#cursos" },
  { label: "Trilhas", href: "#trilhas" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Unidades", href: "#unidades" },
  { label: "Contato", href: "#contato" },
];

const careerTrails = [
  {
    id: "eletrotecnica" as const,
    name: "Eletrotécnica",
    color: "violet",
    icon: Zap,
    eyebrow: "TRILHA 01 · ENERGIA, INDÚSTRIA & AUTOMAÇÃO",
    title: "Carreira após o Técnico em Eletrotécnica",
    intro:
      "Com registro profissional no Conselho da categoria (CRT/CFT), você pode assinar projetos dentro das atribuições legais, atuar em indústrias, concessionárias de energia ou empreender.",
    courseHref: "/tecnico-em-eletrotecnica",
    enrollHref: "/inscricao?curso=Eletrot%C3%A9cnica",
    steps: [
      {
        num: "ETAPA 01",
        phase: "NO CTA",
        title: "Base Prática & Registro Profissional",
        desc: "Domínio de circuitos analógicos e digitais, instalações elétricas, leitura de esquemas, placas de circuito impresso e normas técnicas de segurança.",
        tags: ["Registro Profissional", "Bancadas Práticas", "Projetos Aplicados"],
      },
      {
        num: "ETAPA 02",
        phase: "PRIMEIROS PASSOS NO MERCADO",
        title: "Atuação Técnica Imediata",
        desc: "Ingresso em empresas de manutenção predial e industrial, concessionárias de energia, telecomunicações, construção civil ou atuação autônoma.",
        tags: ["Técnico Eletrotécnico", "Manutenção Industrial", "Projetista Elétrico", "Painéis e Comandos"],
      },
      {
        num: "ETAPA 03",
        phase: "ESPECIALIZAÇÃO & EXPANSÃO",
        title: "Áreas de Alta Valorização",
        desc: "Com a base técnica consolidada, você pode se especializar em setores em plena expansão tecnológica e energética no país.",
        tags: ["Energia Solar Fotovoltaica", "Automação Industrial (CLP)", "Subestações & Alta Tensão", "Eficiência Energética"],
      },
      {
        num: "ETAPA 04",
        phase: "ENSINO SUPERIOR & LIDERANÇA",
        title: "Graduação, Concursos & Negócio Próprio",
        desc: "Quem faz o técnico chega na faculdade com enorme vantagem prática, além de poder prestar concursos técnicos ou abrir sua própria empresa de engenharia/serviços.",
        tags: ["Engenharia Elétrica", "Eng. de Controle e Automação", "Concursos (Petrobras, Furnas, etc.)", "Empresa de Instalações"],
      },
    ],
  },
  {
    id: "enfermagem" as const,
    name: "Enfermagem",
    color: "coral",
    icon: HeartPulse,
    eyebrow: "TRILHA 02 · SAÚDE, ASSISTÊNCIA & CUIDADO HUMANO",
    title: "Carreira após o Técnico em Enfermagem",
    intro:
      "Habilitado com registro no COREN, o Técnico em Enfermagem encontra uma das áreas com maior empregabilidade do Brasil, podendo atuar na rede hospitalar, ambulatorial e em especialidades críticas.",
    courseHref: "/tecnico-em-enfermagem",
    enrollHref: "/inscricao?curso=Enfermagem",
    steps: [
      {
        num: "ETAPA 01",
        phase: "NO CTA",
        title: "Formação Clínica, Ética & COREN",
        desc: "Aulas práticas em laboratório de saúde, biossegurança, preparo e administração de medicamentos, cuidados integrais ao paciente e estágio supervisionado.",
        tags: ["Registro no COREN", "Prática Supervisionada", "Humanização & Técnica"],
      },
      {
        num: "ETAPA 02",
        phase: "PRIMEIROS PASSOS NO MERCADO",
        title: "Hospitais, Clínicas & Diagnóstico",
        desc: "Atuação direta em equipes multiprofissionais de saúde na rede pública e privada, atendimento pré-hospitalar e assistência domiciliar.",
        tags: ["Hospitais e Maternidades", "UPAs e Pronto Socorro", "Clínicas e Laboratórios", "Home Care & Cuidado Domiciliar"],
      },
      {
        num: "ETAPA 03",
        phase: "ESPECIALIZAÇÃO PÓS-TÉCNICA",
        title: "Especialidades de Alta Complexidade",
        desc: "Após o curso técnico, você pode fazer especializações técnicas que ampliam sua remuneração e abrem portas em setores altamente especializados.",
        tags: ["Instrumentação Cirúrgica", "Enfermagem do Trabalho", "UTI Adulto, Pediátrica e Neonatal", "Urgência, Emergência e Resgate"],
      },
      {
        num: "ETAPA 04",
        phase: "ENSINO SUPERIOR & CARREIRA PÚBLICA",
        title: "Graduação na Saúde & Concursos",
        desc: "Muitos técnicos avançam para a graduação já trabalhando na área ou conquistam estabilidade em concursos municipais, estaduais, federais e militares.",
        tags: ["Graduação em Enfermagem", "Biomedicina / Fisioterapia", "Concursos Públicos e Militares", "Gestão Hospitalar"],
      },
    ],
  },
  {
    id: "informatica" as const,
    name: "Informática",
    color: "mint",
    icon: Laptop,
    eyebrow: "TRILHA 03 · COMPUTAÇÃO, SOFTWARE & INFRAESTRUTURA",
    title: "Carreira após o Técnico em Informática",
    intro:
      "Uma formação versátil que prepara você tanto para desenvolver softwares e aplicações web quanto para gerenciar redes, suporte e infraestrutura de TI em empresas de qualquer setor.",
    courseHref: "/tecnico-em-informatica",
    enrollHref: "/inscricao?curso=Inform%C3%A1tica",
    steps: [
      {
        num: "ETAPA 01",
        phase: "NO CTA",
        title: "Programação, Redes & Arquitetura",
        desc: "Lógica de programação, desenvolvimento de sistemas, banco de dados, montagem, configuração de equipamentos e administração de sistemas operacionais.",
        tags: ["Portfólio de Projetos", "Desenvolvimento de Código", "Redes e Hardware"],
      },
      {
        num: "ETAPA 02",
        phase: "PRIMEIROS PASSOS NO MERCADO",
        title: "Desenvolvimento Júnior, Suporte & TI",
        desc: "Entrada rápida no mercado de tecnologia atuando em empresas de software, setores de TI corporativos, consultorias ou como freelancer digital.",
        tags: ["Desenvolvedor Web / Júnior", "Analista de Suporte e Help Desk", "Técnico de Redes e Infraestrutura", "QA / Testes de Software"],
      },
      {
        num: "ETAPA 03",
        phase: "ESPECIALIZAÇÃO & CERTIFICAÇÕES",
        title: "Trilhas Avançadas de Tecnologia",
        desc: "A partir da base técnica, você escolhe sua especialidade favorita no ecossistema digital global, podendo trabalhar inclusive de forma remota.",
        tags: ["Full Stack & Mobile", "Computação em Nuvem (Cloud / DevOps)", "Segurança da Informação (Cybersecurity)", "Ciência de Dados & IA"],
      },
      {
        num: "ETAPA 04",
        phase: "ENSINO SUPERIOR & LIDERANÇA TECH",
        title: "Faculdade de TI, Arquitetura & Startups",
        desc: "Prosseguimento acelerado no ensino superior em computação, carreira internacional em engenharia de software ou criação de soluções digitais próprias.",
        tags: ["Ciência da Computação / Sistemas", "Engenharia de Software / ADS", "Arquiteto de Sistemas / Tech Lead", "Empreendedorismo Digital"],
      },
    ],
  },
];

const communityStories = [
  {
    id: "rafael",
    badge: "EX-ALUNO · ELETROTÉCNICA",
    color: "violet",
    initials: "RM",
    name: "Rafael Mendes",
    role: "Formado no Técnico Pós-Médio · Atua em Manutenção Elétrica",
    highlight: "Destaque na Mostra de Projetos de Automação",
    icon: Zap,
    quote:
      "“Entrei no CTA buscando entender na prática como funcionavam os sistemas elétricos industriais. As bancadas de laboratório e o incentivo para desenvolver nosso projeto na mostra técnica me deram a segurança que eu precisava para conquistar minha vaga na área.”",
  },
  {
    id: "camila",
    badge: "ALUNA · ENFERMAGEM",
    color: "coral",
    initials: "CS",
    name: "Camila Soares",
    role: "Estudante do Técnico em Enfermagem · Unidade Bangu",
    highlight: "Ações Comunitárias de Prevenção e Saúde",
    icon: HeartPulse,
    quote:
      "“Na Enfermagem, técnica e empatia caminham juntas. Aqui no CTA encontrei professores que vivem a rotina hospitalar e colegas que viraram uma verdadeira rede de apoio. A gente treina cada procedimento juntas até ganhar total confiança.”",
  },
  {
    id: "lucas",
    badge: "EX-ALUNO · INFORMÁTICA",
    color: "mint",
    initials: "LO",
    name: "Lucas Oliveira",
    role: "Egresso do Ensino Médio Técnico · Informática",
    highlight: "Desenvolvedor Júnior & Universitário em TI",
    icon: Laptop,
    quote:
      "“Fazer o Ensino Médio integrado ao Técnico em Informática mudou minha visão de futuro. Nos laboratórios do CTA criei meus primeiros sistemas em equipe, participei de grupos de código e saí preparado tanto para o mercado quanto para a faculdade.”",
  },
];

const communityLife = [
  {
    id: "mostra",
    img: "/hero-slide-2.jpg",
    alt: "Estudantes colaborando em projeto prático no laboratório do CTA",
    tag: "MOSTRA TECNOLÓGICA",
    meta: "PROJETOS INTERDISCIPLINARES",
    title: "Da bancada de aula para soluções reais",
    description:
      "Anualmente, nossas turmas se reúnem para desenvolver protótipos, apresentações e soluções aplicadas que integram teoria, tecnologia e impacto na comunidade.",
  },
  {
    id: "labs",
    img: "/hero-slide-1.jpg",
    alt: "Alunos de informática programando em conjunto no laboratório",
    tag: "DIA A DIA NOS LABS",
    meta: "PRÁTICA & COLABORAÇÃO",
    title: "Aprender fazendo, lado a lado",
    description:
      "Os laboratórios são pontos de encontro onde alunos trocam conhecimentos, resolvem desafios práticos em equipe e contam com orientação próxima dos docentes.",
  },
  {
    id: "conexao",
    img: "/cta-ambiente.jpg",
    alt: "Espaço de convivência e atendimento da comunidade escolar CTA",
    tag: "CONEXÃO & FUTURO",
    meta: "TRAJETÓRIAS QUE INSPIRAM",
    title: "Uma comunidade que segue junto",
    description:
      "Do primeiro dia de aula à conquista do diploma técnico, cultivamos um ambiente acolhedor em Bangu que apoia jovens e adultos em cada passo da jornada.",
  },
];

function Brand({ variant = "gold" }: { variant?: "gold" | "white" }) {
  return (
    <a className="brand" href="#inicio" aria-label="CTA Escola Técnica — início">
      <img
        className="brand__logo"
        src={variant === "white" ? "/logo-cta-branca.png" : "/logo-cta-amarela.png"}
        alt="CTA — Escola Técnica"
        width="174"
        height="48"
      />
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow--light" : ""}`}><span />{children}</p>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [communityFilter, setCommunityFilter] = useState<"all" | "depoimentos" | "vivencia">("all");
  const [activeTrail, setActiveTrail] = useState<"eletrotecnica" | "enfermagem" | "informatica">("eletrotecnica");
  const [activeMapUnit, setActiveMapUnit] = useState<"bangu" | "campogrande">("bangu");

  const mapUnits = {
    bangu: {
      title: "Unidade Bangu · Zona Oeste",
      address: "Campus da Universidade Cândido Mendes — Bangu, Rio de Janeiro - RJ",
      embedUrl:
        "https://maps.google.com/maps?q=Universidade+Candido+Mendes+Bangu+Rio+de+Janeiro&t=&z=16&ie=UTF8&iwloc=&output=embed",
      routeUrl:
        "https://www.google.com/maps/search/?api=1&query=Universidade+Candido+Mendes+Bangu+Rio+de+Janeiro",
    },
    campogrande: {
      title: "Unidade Campo Grande · Zona Oeste",
      address: "Rua Cariús, 223 — Campo Grande, Rio de Janeiro - RJ",
      embedUrl:
        "https://maps.google.com/maps?q=Rua+Carius+223+Campo+Grande+Rio+de+Janeiro&t=&z=16&ie=UTF8&iwloc=&output=embed",
      routeUrl:
        "https://www.google.com/maps/search/?api=1&query=Rua+Carius+223+Campo+Grande+Rio+de+Janeiro",
    },
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev: number) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="site-shell" id="inicio">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav id="mobile-navigation" className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Navegação principal">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a className="mobile-nav-apply" href={APPLY}>Inscreva-se <ArrowUpRight size={16} /></a>
          </nav>
          <a className="header-cta" href={APPLY}>
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

      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <Eyebrow light>CTA · ESCOLA TÉCNICA</Eyebrow>
              <h1 id="hero-title">Seu futuro não espera.<br /><em>Prepare-se para ele.</em></h1>
              <p className="hero-lede">Formação técnica para transformar curiosidade em conhecimento — e conhecimento em novos caminhos.</p>
              <div className="hero-actions">
                <a className="button button--gold" href="#cursos">Explore os cursos <ArrowRight size={17} /></a>
                <a className="button button--outline" href={APPLY}>Quero me inscrever <ArrowUpRight size={16} /></a>
              </div>
              <div className="hero-note">
                <span className="hero-note__icon"><GraduationCap size={19} /></span>
                <span>Ensino conectado a projetos, tecnologia<br className="desktop-break" /> e ao mundo do trabalho.</span>
              </div>
            </div>
            <div className="hero-visual">
              <div
                className="hero-photo-wrap"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="hero-slides">
                  {heroSlides.map((slide, idx) => (
                    <img
                      key={slide.src}
                      className={`hero-photo hero-slide${idx === activeSlide ? " hero-slide--active" : ""}`}
                      src={slide.src}
                      alt={slide.alt}
                      loading={idx === 0 ? undefined : "lazy"}
                    />
                  ))}
                </div>
                <div className="hero-photo-shade" />
                <div className="photo-caption"><span className="caption-dot" />Aprender fazendo muda tudo.</div>
                <div className="hero-slider-controls">
                  <div className="hero-slider-dots">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.src}
                        type="button"
                        className={`hero-slider-dot${idx === activeSlide ? " hero-slider-dot--active" : ""}`}
                        aria-label="Selecionar foto do laboratório"
                        title="Selecionar foto do laboratório"
                        onClick={() => setActiveSlide(idx)}
                      />
                    ))}
                  </div>
                  <div className="hero-slider-arrows">
                    <button
                      type="button"
                      className="hero-slider-btn"
                      aria-label="Foto anterior"
                      title="Foto anterior"
                      onClick={() => setActiveSlide((prev: number) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    >
                      <ChevronLeft size={15} strokeWidth={2.2} />
                    </button>
                    <button
                      type="button"
                      className="hero-slider-btn"
                      aria-label="Próxima foto"
                      title="Próxima foto"
                      onClick={() => setActiveSlide((prev: number) => (prev + 1) % heroSlides.length)}
                    >
                      <ChevronRight size={15} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="hero-stamp">
                <span className="stamp-top">PROJETOS & TECNOLOGIA</span>
                <strong>Desde<br /><b>2002</b></strong>
                <span className="stamp-bottom">IDEIAS EM MOVIMENTO</span>
              </div>
              <span className="hero-orbit hero-orbit--one" aria-hidden="true" />
              <span className="hero-orbit hero-orbit--two" aria-hidden="true" />
            </div>
          </div>
          <div className="hero-bottomline">
            <span>FORMAÇÃO QUE ABRE CAMINHOS</span>
            <a href="#cursos">Descubra sua área <ArrowDownRight size={16} /></a>
          </div>
        </section>

        <section className="intro-band" aria-label="Áreas de formação">
          <div className="intro-band__label"><span className="pulse-dot" /> APRENDIZADO COM PROPÓSITO</div>
          <div className="intro-band__text">Três áreas. <strong>Novas possibilidades.</strong></div>
          <a href="#cursos" className="round-link" aria-label="Ver os cursos"><ArrowDownRight size={19} /></a>
        </section>

        <section className="courses-section section-pad" id="cursos" aria-labelledby="courses-title">
          <div className="section-heading">
            <div>
              <Eyebrow>ESCOLHA SUA DIREÇÃO</Eyebrow>
              <h2 id="courses-title">Conhecimento que<br /><span>vira possibilidade.</span></h2>
            </div>
            <div className="section-heading__aside">
              <p>Encontre uma área que combina com os seus planos. Conheça as formações técnicas do CTA e consulte os detalhes de cada curso.</p>
              <a href="/nossos-cursos" className="text-link">Ver todos os cursos <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="course-grid">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <a className={`course-card course-card--${course.color}`} key={course.number} href={course.href}>
                  <div className="course-card__top">
                    <span className="course-number">{course.number} <span>/ 03</span></span>
                    <span className="course-icon"><Icon size={21} strokeWidth={1.8} /></span>
                  </div>
                  <p className="course-category">{course.category}</p>
                  <h3>{course.name}</h3>
                  <p className="course-description">{course.description}</p>
                  <span className="course-more">Conheça o curso <ArrowUpRight size={16} /></span>
                </a>
              );
            })}
          </div>
          <div className="courses-footer">
            <span className="courses-footer__mark"><Sparkles size={17} /></span>
            <p>Quer descobrir qual modalidade combina com você?</p>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-link">Converse com a equipe <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="career-trail-section section-pad" id="trilhas" aria-labelledby="trilhas-title">
          <div className="career-trail-header">
            <div>
              <Eyebrow>TRILHA DE CARREIRA & FUTURO</Eyebrow>
              <h2 id="trilhas-title">O que você pode fazer<br /><span>depois do curso técnico?</span></h2>
            </div>
            <div className="career-trail-header__aside">
              <p>A formação técnica abre portas imediatas no mercado de trabalho e serve como um trampolim estratégico para especializações, concursos e ensino superior. Escolha uma área abaixo e veja a jornada completa:</p>
              <div className="trail-selector" aria-label="Selecionar trilha de carreira por curso">
                {careerTrails.map((trail) => {
                  const TrailIcon = trail.icon;
                  const isActive = activeTrail === trail.id;
                  return (
                    <button
                      key={trail.id}
                      type="button"
                      className={`trail-tab trail-tab--${trail.color}${isActive ? " trail-tab--active" : ""}`}
                      onClick={() => setActiveTrail(trail.id)}
                    >
                      <TrailIcon size={15} strokeWidth={2.2} />
                      {trail.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {careerTrails.map((trail) => (
            <div
              key={trail.id}
              className={`trail-panel trail-panel--${trail.color}${activeTrail === trail.id ? " trail-panel--active" : ""}`}
            >
              <div className="trail-panel__intro">
                <div className="trail-panel__badge">
                  <span>{trail.eyebrow}</span>
                  <h3>{trail.title}</h3>
                </div>
                <p>{trail.intro}</p>
              </div>

              <div className="trail-steps-grid">
                {trail.steps.map((step) => (
                  <div key={step.num} className="trail-step-card">
                    <div className="trail-step-card__top">
                      <span className="trail-step-num">{step.num}</span>
                      <span className="trail-step-phase">{step.phase}</span>
                    </div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                    <ul className="trail-tags">
                      {step.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="trail-panel__footer">
                <span>Pronto para iniciar sua trilha em <strong>{trail.name}</strong>?</span>
                <div className="trail-panel__actions">
                  <a className="text-link" href={trail.courseHref}>
                    Ver página do curso <ArrowUpRight size={15} />
                  </a>
                  <a className="button button--gold" href={trail.enrollHref}>
                    Inscrever-se em {trail.name} <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="path-section" id="sobre" aria-labelledby="path-title">
          <div className="path-copy">
            <Eyebrow light>MAIS DO QUE UM CURSO</Eyebrow>
            <h2 id="path-title">Um próximo passo<br />do seu jeito.</h2>
            <p>Da formação técnica ao ensino médio e à educação de jovens e adultos, o CTA oferece diferentes possibilidades para seguir aprendendo em cada etapa.</p>
            <a className="button button--gold" href="/nossos-cursos">Conheça a proposta <ArrowUpRight size={16} /></a>
          </div>
          <div className="path-options">
            <div className="path-card path-card--featured">
              <span className="path-card__icon"><GraduationCap size={23} /></span>
              <div><span>PARA COMEÇAR E AVANÇAR</span><h3>Ensino Médio Técnico</h3></div>
              <ArrowUpRight className="path-card__arrow" size={18} />
            </div>
            <div className="path-card">
              <span className="path-card__icon"><BookOpen size={22} /></span>
              <div><span>FORMAÇÃO PROFISSIONAL</span><h3>Técnico de nível médio & Pós-Médio</h3></div>
              <Check className="path-card__check" size={18} />
            </div>
            <div className="path-card">
              <span className="path-card__icon"><Award size={22} /></span>
              <div><span>OUTRAS POSSIBILIDADES</span><h3>Especialização & Qualificação</h3></div>
              <Check className="path-card__check" size={18} />
            </div>
            <div className="path-card">
              <span className="path-card__icon"><BookOpen size={22} /></span>
              <div><span>EDUCAÇÃO CONTINUADA</span><h3>Ensino Médio Geral & EJA</h3></div>
              <Check className="path-card__check" size={18} />
            </div>
            <p className="path-disclaimer">A disponibilidade de cada modalidade pode variar. Consulte o CTA para detalhes.</p>
          </div>
        </section>

        <section className="about-section section-pad" aria-labelledby="about-title">
          <div className="about-photo">
            <img src="/cta-ambiente.jpg" alt="Espaço de atendimento do CTA Escola Técnica" loading="lazy" />
            <div className="about-photo__label"><span>CTA</span><span>RIO DE JANEIRO</span></div>
          </div>
          <div className="about-copy">
            <Eyebrow>NOSSA INSTITUIÇÃO</Eyebrow>
            <h2 id="about-title">Ideias que ganham<br /><span>forma e futuro.</span></h2>
            <p>O Centro de Tecnologia Aplicada atua na formação profissional, promovendo pesquisa e desenvolvimento de projetos. Uma trajetória que combina ensino de qualidade com diálogo próximo ao segmento produtivo.</p>
            <div className="award-callout">
              <div className="award-icon"><Award size={22} /></div>
              <div><strong>Projetos reconhecidos desde 2002</strong><span>Premiações em mostras de projetos com soluções que empregam tecnologia.</span></div>
              <span className="award-year">’02</span>
            </div>
            <a className="text-link" href="/sobre-o-cta">Saiba mais sobre o CTA — Conheça nossa história <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="community-section section-pad" id="comunidade" aria-labelledby="community-title">
          <div className="community-header">
            <div>
              <Eyebrow>COMUNIDADE CTA · VIVÊNCIA & TRAJETÓRIAS</Eyebrow>
              <h2 id="community-title">Quem faz o CTA<br /><span>acontecer todos os dias.</span></h2>
            </div>
            <div className="community-header__aside">
              <p>Mais do que salas de aula e laboratórios, somos uma rede de estudantes, professores e ex-alunos conectados pela prática, pela troca de experiências e por histórias reais de transformação.</p>
              <div className="community-tabs" aria-label="Filtrar histórias da comunidade">
                <button
                  type="button"
                  className={`community-tab${communityFilter === "all" ? " community-tab--active" : ""}`}
                  onClick={() => setCommunityFilter("all")}
                >
                  Tudo da Comunidade
                </button>
                <button
                  type="button"
                  className={`community-tab${communityFilter === "depoimentos" ? " community-tab--active" : ""}`}
                  onClick={() => setCommunityFilter("depoimentos")}
                >
                  Depoimentos & Egressos
                </button>
                <button
                  type="button"
                  className={`community-tab${communityFilter === "vivencia" ? " community-tab--active" : ""}`}
                  onClick={() => setCommunityFilter("vivencia")}
                >
                  Projetos & Vivência
                </button>
              </div>
            </div>
          </div>

          <div className="community-pulse-bar">
            <div className="community-pulse-item">
              <span className="community-pulse-icon"><Users size={18} /></span>
              <div>
                <strong>Rede de Alunos e Ex-Alunos</strong>
                <span>Troca constante entre quem está começando e quem já atua no mercado.</span>
              </div>
            </div>
            <div className="community-pulse-item">
              <span className="community-pulse-icon"><Lightbulb size={18} /></span>
              <div>
                <strong>Mostras de Projetos desde 2002</strong>
                <span>Iniciativas estudantis premiadas com foco em tecnologia aplicada.</span>
              </div>
            </div>
            <div className="community-pulse-item">
              <span className="community-pulse-icon"><BookOpen size={18} /></span>
              <div>
                <strong>Aprendizado Colaborativo</strong>
                <span>Grupos de estudo, bancadas práticas e mentoria próxima dos professores.</span>
              </div>
            </div>
          </div>

          <div className="community-stories-grid">
            {(communityFilter === "all" || communityFilter === "depoimentos") &&
              communityStories.map((story) => {
                const StoryIcon = story.icon;
                return (
                  <article key={story.id} className={`story-card story-card--${story.color}`}>
                    <div className="story-card__head">
                      <span className="story-badge">{story.badge}</span>
                      <Quote className="story-quote-icon" size={22} />
                    </div>
                    <blockquote className="story-card__quote">{story.quote}</blockquote>
                    <div className="story-card__highlight">
                      <StoryIcon size={14} strokeWidth={2.2} />
                      <span>{story.highlight}</span>
                    </div>
                    <footer className="story-card__author">
                      <div className={`story-avatar story-avatar--${story.color}`} aria-hidden="true">
                        {story.initials}
                      </div>
                      <div>
                        <strong>{story.name}</strong>
                        <span>{story.role}</span>
                      </div>
                    </footer>
                  </article>
                );
              })}

            {(communityFilter === "all" || communityFilter === "vivencia") &&
              communityLife.map((item) => (
                <article key={item.id} className="life-card">
                  <div className="life-card__media">
                    <img src={item.img} alt={item.alt} loading="lazy" />
                    <span className="life-card__tag">{item.tag}</span>
                  </div>
                  <div className="life-card__body">
                    <span className="life-card__meta">{item.meta}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
          </div>

          <div className="community-banner">
            <div className="community-banner__copy">
              <span className="community-banner__eyebrow">FAÇA PARTE DESSA HISTÓRIA</span>
              <h3>Estuda ou já se formou no CTA? Quer começar sua trajetória com a gente?</h3>
              <p>Venha conhecer nossas unidades em Bangu e Campo Grande ou compartilhe sua experiência com a nossa equipe.</p>
            </div>
            <div className="community-banner__actions">
              <a className="button button--gold" href={APPLY}>
                Quero fazer parte <ArrowUpRight size={16} />
              </a>
              <a
                className="button button--outline"
                href="https://wa.me/5521994368367?text=Ol%C3%A1%2C%20CTA!%20Quero%20saber%20mais%20sobre%20a%20comunidade%20e%20os%20cursos."
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar com o CTA <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="locations-section" id="unidades" aria-labelledby="locations-title">
          <div className="locations-top">
            <div>
              <Eyebrow>PERTO DE VOCÊ</Eyebrow>
              <h2 id="locations-title">Presente no Rio.<br /><span>Conectado a você.</span></h2>
            </div>
            <p>O CTA está presente em Bangu e em Campo Grande, na Zona Oeste do Rio de Janeiro. Entre em contato para consultar as unidades, disponibilidade e a melhor forma de chegar.</p>
          </div>
          <div className="location-cards">
            <div
              className={`location-card location-card--west${activeMapUnit === "bangu" ? " location-card--active" : ""}`}
              onClick={() => setActiveMapUnit("bangu")}
            >
              <span className="location-card__index">UNIDADE 01 · ZONA OESTE</span>
              <MapPin size={22} />
              <h3>Bangu</h3>
              <p>Campus da Universidade Cândido Mendes</p>
              <div className="location-card__actions">
                <button
                  type="button"
                  className="location-map-trigger"
                  onClick={() => setActiveMapUnit("bangu")}
                >
                  Ver no mapa interativo
                </button>
                <a
                  href="https://wa.me/5521994368367?text=Ol%C3%A1%2C%20CTA!%20Gostaria%20de%20saber%20mais%20sobre%20a%20unidade%20Bangu."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar unidade <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <div
              className={`location-card location-card--north${activeMapUnit === "campogrande" ? " location-card--active" : ""}`}
              onClick={() => setActiveMapUnit("campogrande")}
            >
              <span className="location-card__index">UNIDADE 02 · ZONA OESTE</span>
              <MapPin size={22} />
              <h3>Campo Grande</h3>
              <p>Rua Cariús, 223 — Campo Grande</p>
              <div className="location-card__actions">
                <button
                  type="button"
                  className="location-map-trigger"
                  onClick={() => setActiveMapUnit("campogrande")}
                >
                  Ver no mapa interativo
                </button>
                <a
                  href="https://wa.me/5521994368367?text=Ol%C3%A1%2C%20CTA!%20Gostaria%20de%20saber%20mais%20sobre%20a%20unidade%20Campo%20Grande."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar unidade <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>

          <div className="interactive-map-shell" aria-label="Mapa interativo das unidades CTA">
            <div className="interactive-map-bar">
              <div className="interactive-map-bar__info">
                <span className="pulse-dot" />
                <div>
                  <strong>{mapUnits[activeMapUnit].title}</strong>
                  <span>{mapUnits[activeMapUnit].address}</span>
                </div>
              </div>
              <div className="interactive-map-bar__controls">
                <div className="map-unit-switcher" aria-label="Alternar unidade no mapa">
                  <button
                    type="button"
                    className={`map-switch-btn${activeMapUnit === "bangu" ? " map-switch-btn--active" : ""}`}
                    onClick={() => setActiveMapUnit("bangu")}
                  >
                    01 · Bangu
                  </button>
                  <button
                    type="button"
                    className={`map-switch-btn${activeMapUnit === "campogrande" ? " map-switch-btn--active" : ""}`}
                    onClick={() => setActiveMapUnit("campogrande")}
                  >
                    02 · Campo Grande (Rua Cariús, 223)
                  </button>
                </div>
                <a
                  className="button button--gold map-route-btn"
                  href={mapUnits[activeMapUnit].routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Traçar rota no Google Maps <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="interactive-map-frame-wrap">
              <iframe
                className="interactive-map-iframe"
                title="Localização da Unidade CTA no Google Maps"
                src={mapUnits[activeMapUnit].embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="closing-cta" id="contato" aria-labelledby="closing-title">
          <div className="closing-cta__ornament" aria-hidden="true"><span /><span /><span /></div>
          <div className="closing-cta__copy">
            <Eyebrow light>SEU PRÓXIMO CAPÍTULO COMEÇA AQUI</Eyebrow>
            <h2 id="closing-title">Pronto para dar<br /><em>o próximo passo?</em></h2>
            <p>Explore as formações e fale com a equipe do CTA para saber mais.</p>
            <div className="closing-actions">
              <a className="button button--gold" href={APPLY}>Acessar inscrição <ArrowUpRight size={16} /></a>
              <a className="button button--outline" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> Falar pelo WhatsApp</a>
            </div>
          </div>
          <div className="closing-cta__side">
            <span className="closing-cta__label">CTA ESCOLA TÉCNICA</span>
            <span className="closing-cta__big">Seu caminho.<br />Sua escolha.</span>
            <ArrowDownRight size={25} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <Brand variant="white" />
            <p>Formação profissional, conhecimento e novas possibilidades para o Rio de Janeiro.</p>
          </div>
          <div className="footer-links-col">
            <span className="footer-title">EXPLORE</span>
            <a href="/nossos-cursos">Nossos Cursos</a>
            <a href="/sobre-o-cta">Sobre o CTA</a>
            <a href="#comunidade">Comunidade</a>
            <a href="#unidades">Unidades</a>
            <a href={APPLY}>Faça sua inscrição <ArrowUpRight size={13} /></a>
          </div>
          <div className="footer-links-col footer-contact-col">
            <span className="footer-title">FALE COM A GENTE</span>
            <a href="tel:+552134493572">(21) 3449-3572</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp: (21) 99436-8367 <ArrowUpRight size={13} /></a>
            <a href="mailto:faleconosco@ctarj.org.br">faleconosco@ctarj.org.br <ArrowUpRight size={13} /></a>
          </div>
          <a className="footer-top" href="#inicio" aria-label="Voltar ao início"><ArrowUpRight size={20} /></a>
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
