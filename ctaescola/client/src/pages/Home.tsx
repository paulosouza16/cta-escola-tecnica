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
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const OFFICIAL = "https://ctarj.org.br";
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
    alt: "Estudantes da CTA Escola Técnica em aula prática no laboratório de informática",
  },
  {
    src: "/hero-slide-2.jpg",
    alt: "Alunos da CTA colaborando em atividades práticas em laboratório",
  },
  {
    src: "/hero-slide-3.jpg",
    alt: "Desenvolvimento de código e programação na prática na CTA Escola Técnica",
  },
];

const navItems = [
  { label: "Cursos", href: "#cursos" },
  { label: "A CTA", href: "#sobre" },
  { label: "Unidades", href: "#unidades" },
  { label: "Contato", href: "#contato" },
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
            <a className="text-link" href={OFFICIAL} target="_blank" rel="noopener noreferrer">Saiba mais sobre o CTA <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="locations-section" id="unidades" aria-labelledby="locations-title">
          <div className="locations-top">
            <div>
              <Eyebrow>PERTO DE VOCÊ</Eyebrow>
              <h2 id="locations-title">Presente no Rio.<br /><span>Conectado a você.</span></h2>
            </div>
            <p>O CTA está presente em Bangu, na Zona Oeste do Rio de Janeiro. Entre em contato para consultar a unidade, disponibilidade e a melhor forma de chegar.</p>
          </div>
          <div className="location-cards">
            <div className="location-card location-card--west">
              <span className="location-card__index">UNIDADE · ZONA OESTE</span>
              <MapPin size={22} />
              <h3>Bangu</h3>
              <p>Campus da Universidade Cândido Mendes</p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Consultar unidade <ArrowUpRight size={15} /></a>
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
            <a href="#sobre">A CTA</a>
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
