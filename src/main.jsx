import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { projects, evidence } from './site-data.js';
import ProjectOneCaseStudy from './ProjectOneCaseStudy.jsx';
import ProjectThreeCaseStudy from './ProjectThreeCaseStudy.jsx';
import ProjectFiveCaseStudy from './ProjectFiveCaseStudy.jsx';

const IntelligenceField = lazy(() => import('./IntelligenceField.jsx'));

function SceneFallback() {
  return <div className="intelligence-field field-fallback" aria-hidden="true"><div className="field-fallback-art" /></div>;
}

class SceneBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.warn('Neural scene chunk failed; showing the CSS fallback.', error); }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children; }
}

function DeferredIntelligenceField() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 180);
    return () => window.clearTimeout(timer);
  }, []);
  return <SceneBoundary>{ready ? <Suspense fallback={<SceneFallback />}><IntelligenceField /></Suspense> : <SceneFallback />}</SceneBoundary>;
}

function Arrow({ diagonal = false }) { return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>; }

function Header() {
  return <header className="site-header">
    <a className="wordmark" href="#top" aria-label="Rushikesh Wani, home"><span>R</span><i>/</i>W</a>
    <nav aria-label="Main navigation"><a href="#projects">Work</a><a href="#evidence">Evidence</a><a href="#experience">Experience</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
    <div className="header-actions"><a className="header-link" href="https://github.com/iamrushi100" target="_blank" rel="noreferrer">GitHub profile <Arrow diagonal /></a><a className="header-resume" href="/Rushikesh_Wani_Portfolio_Resume.pdf" target="_blank" rel="noreferrer">Resume <Arrow diagonal /></a></div>
  </header>;
}

function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-scene"><DeferredIntelligenceField /></div>
    <div className="hero-content">
      <p className="eyebrow"><span className="status-dot" /> RUSHIKESH WANI · COMPUTER ENGINEER · CYBERSECURITY HONORS</p>
      <h1 id="hero-title">AI engineering<br/>for retrieval,<br/><em>evaluation,</em><br/>and security.</h1>
      <p className="hero-copy">I build and evaluate retrieval and GenAI systems, with cybersecurity demonstrated through vulnerability-prioritization work.</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">Explore projects <Arrow /></a><a className="button button-quiet" href="https://github.com/iamrushi100" target="_blank" rel="noreferrer">View GitHub profile <Arrow diagonal /></a></div>
    </div>
    <div className="hero-meta"><span>RUSHIKESH WANI <i>—</i> AI / GENAI ENGINEERING</span><span className="scroll-cue"><span className="scroll-line"/> SCROLL TO EXPLORE</span></div>
    <div className="hero-visual-caption" aria-hidden="true">INTERCONNECTED SYSTEMS<br/><span>CURSOR RESPONSIVE FIELD / 01</span></div>
  </section>;
}

function ProjectVisual({ index }) {
  const visuals = [
    { label: 'RETRIEVAL / RANKING', image: '/screens/project1/project1-hybrid-retrieval.png', alt: 'Project 1 interface showing hybrid retrieval results ranked from semantic and BM25 candidates.' },
    { label: 'EVALUATION / COMPARISON', image: '/screens/ragwatch/ragwatch-evaluation.png', alt: 'RAGWatch Streamlit interface displaying the saved fictional retrieval evaluation report.' },
    { label: 'THREAT / PRIORITY', image: '/screens/project5/project5-dashboard.png', alt: 'Vulnerability prioritization dashboard showing the synthetic fixture assessment and its evidence.' },
  ];
  const item = visuals[index];
  return <div className={`project-visual project-visual-${index + 1}`}>
    <div className="visual-label">{item.label} <span>0{index + 1}</span></div>
    <img className="project-visual-image" src={item.image} alt={item.alt} loading="lazy" />
  </div>;
}
function ProjectShowcase({ project, index }) {
  return <article className={`project-showcase showcase-${index + 1}`}>
    <div className="project-copy">
      <div className="showcase-index"><span>{project.shortTitle}</span><span>{project.kind}</span></div>
      <p className="project-status"><i />{project.status}</p>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      {project.caseStudyPath ? <a className="case-note case-link" href={project.caseStudyPath}>VIEW CASE STUDY <span aria-hidden="true">↗</span></a> : <span className="case-note">CASE STUDY IN PREPARATION</span>}
    </div>
    <ProjectVisual index={project.visualIndex ?? (index % 3)} />
  </article>;
}

function Projects() {
  return <section className="projects-section" id="projects" aria-labelledby="projects-title">
    <div className="section-intro projects-intro"><p className="eyebrow">01 / SELECTED ENGINEERING WORK</p><h2 id="projects-title">Selected engineering work.<br/><em>Evidence in context.</em></h2><p>Three implemented projects across retrieval, applied AI evaluation, and cybersecurity, documented through technical case studies. More work is ongoing.</p><a className="text-link" href="https://github.com/iamrushi100" target="_blank" rel="noreferrer">GitHub profile · project repositories <Arrow diagonal /></a></div>
    <div className="showcase-list">{projects.map((project, index) => <ProjectShowcase key={project.title} project={project} index={index} />)}</div>
  </section>;
}

function Evidence() {
  return <section className="evidence-section" id="evidence" aria-labelledby="evidence-title">
    <div className="evidence-top"><p className="eyebrow">02 / ENGINEERING EVIDENCE</p><span className="evidence-state"><i /> CHECKED-IN · PRIOR RUNS · NOT CAPTURED</span></div>
    <div className="evidence-main"><h2 id="evidence-title">Claims should<br/><em>leave a trail.</em></h2><p className="evidence-copy">I document how systems are built, how they are tested, what the results show, and where the evidence stops.</p></div>
    <div className="evidence-list">{evidence.map((item, index) => item.url ? <a className="evidence-row evidence-row-link" key={item.label} href={item.url} target="_blank" rel="noreferrer"><span className="evidence-number">0{index + 1}</span><span className="evidence-name">{item.label} <span>· {item.status}{item.detail ? ` · ${item.detail}` : ''}</span></span><span className="evidence-availability">{item.status}</span><span className="evidence-arrow" aria-hidden="true">↗</span></a> : <div className="evidence-row" key={item.label}><span className="evidence-number">0{index + 1}</span><span className="evidence-name">{item.label} <span>· {item.status}{item.detail ? ` · ${item.detail}` : ''}</span></span><span className="evidence-availability">{item.status}</span><span className="evidence-arrow" aria-hidden="true" /></div>)}</div>
    <p className="evidence-copy">CHECKED-IN means an artifact is stored in the corresponding project repository. Rows link directly to repository artifacts only when the path has been verified. Project case studies connect implementation details with tests, results, decisions, and explicit limits.</p>
  </section>;
}

function About() {
  return <><section className="experience-section" id="experience" aria-labelledby="experience-title"><div className="about-serial">03<br/><span>EXPERIENCE</span></div><div className="experience-main"><p className="eyebrow">EXPERIENCE &amp; EDUCATION</p><h2 id="experience-title">Learning by <em>building.</em></h2><div className="experience-grid"><article className="experience-entry"><span className="experience-kicker">AI INTERN · JAN 2025 — JUN 2025</span><h3>CodeFlow Studios</h3><p>Developed Python backend functionality for client websites and integrated chatbot features for basic customer queries.</p></article><article className="experience-entry"><span className="experience-kicker">ARTIFICIAL INTELLIGENCE INTERN · JAN 2025 — FEB 2025</span><h3>CodSoft</h3><p>Delivered a machine learning project in Python covering data preprocessing and model implementation.</p></article><article className="experience-entry experience-education"><span className="experience-kicker">EDUCATION · 2022 — 2026</span><h3>B.E. Computer Engineering</h3><p>Savitribai Phule Pune University (SPPU) · CGPA 8.05 · Honors in Cybersecurity</p></article></div></div></section>
  <section className="about-section" id="about" aria-labelledby="about-title"><div className="about-serial">04<br/><span>ABOUT</span></div><div className="about-main"><p className="eyebrow">SOFTWARE · AI · DATA · SECURITY</p><h2 id="about-title">Building with curiosity.<br/><em>Engineering with evidence.</em></h2></div><div className="about-detail"><p>I’m a Computer Engineering graduate with Cybersecurity Honors, building practical software across backend engineering, machine learning, GenAI, data, and intelligent applications.</p><p>I like working across the full path from data and system design to implementation, evaluation, and iteration. I care about understanding how a system works, measuring whether it works, and making its limitations clear.</p></div><div className="skills-grid" aria-label="Technical skills"><div className="skill-group"><p className="skill-label">DEMONSTRATED · SOFTWARE</p><p>Python · FastAPI · REST APIs · SQLite</p></div><div className="skill-group"><p className="skill-label">DEMONSTRATED · AI / ML</p><p>scikit-learn · Sentence Transformers · semantic retrieval · TF-IDF</p></div><div className="skill-group"><p className="skill-label">DEMONSTRATED · GENAI / RETRIEVAL</p><p>RAG · BM25 · hybrid retrieval · RRF · retrieval evaluation · Streamlit · SQLite</p></div><div className="skill-group"><p className="skill-label">DEMONSTRATED · CYBERSECURITY</p><p>Vulnerability prioritization · NVD / KEV / EPSS client integration</p></div><div className="skill-group skill-group-other"><p className="skill-label">OTHER TOOLS / TECHNOLOGIES</p><div className="other-skill-groups"><p><span className="skill-sub-label">ML / DATA</span>PyTorch · TensorFlow · NLP · Machine Learning · Data Analysis · pandas · NumPy · EDA</p><p><span className="skill-sub-label">DEVELOPMENT / FRAMEWORKS</span>SQL · Git · Docker · LangChain</p><p><span className="skill-sub-label">SECURITY</span>Cybersecurity · Security Engineering</p></div></div></div></section></>;
}

function Footer() {
  return <footer id="contact"><div className="footer-main"><div><p className="eyebrow">05 / CONTACT</p><p className="footer-owner">Rushikesh Wani</p><h2>Let’s start with<br/><em>the work itself.</em></h2></div><div className="footer-contact"><p>Available for AI Engineer opportunities.</p><a className="button button-primary" href="mailto:wanirushikesh74@gmail.com">Email me <Arrow diagonal /></a><div className="contact-links"><a href="mailto:wanirushikesh74@gmail.com">wanirushikesh74@gmail.com</a><a href="#contact" aria-disabled="true" className="linkedin-placeholder">LinkedIn · profile in progress</a><a className="resume-link" href="/Rushikesh_Wani_Portfolio_Resume.pdf" target="_blank" rel="noreferrer">Download resume PDF <Arrow diagonal /></a></div></div></div><div className="footer-bottom"><span className="footer-owner-small">Rushikesh Wani</span><a className="wordmark" href="#top" aria-label="Back to top"><span>R</span><i>/</i>W</a><span>BUILDING IN PUBLIC, WITH EVIDENCE.</span><a href="#top">BACK TO TOP ↑</a></div></footer>;
}

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  useEffect(() => { const titles = { "/": "Rushikesh Wani | AI Engineer & Cybersecurity", "/projects/document-retrieval": "Intelligent Document Retrieval & Evaluation | Rushikesh Wani", "/projects/project-1": "Intelligent Document Retrieval & Evaluation | Rushikesh Wani", "/projects/ragwatch": "RAGWatch — Retrieval Quality Evaluation | Rushikesh Wani", "/projects/project-3": "RAGWatch — Retrieval Quality Evaluation | Rushikesh Wani", "/projects/vuln-prioritization": "Vulnerability Prioritization | Rushikesh Wani", "/projects/project-5": "Vulnerability Prioritization | Rushikesh Wani" }; document.title = titles[pathname] || titles["/"]; }, [pathname]);
  if (pathname === "/projects/ragwatch" || pathname === "/projects/project-3") return <ProjectThreeCaseStudy />;
  if (pathname === "/projects/document-retrieval" || pathname === "/projects/project-1") return <ProjectOneCaseStudy />;
  if (pathname === "/projects/vuln-prioritization" || pathname === "/projects/project-5") return <ProjectFiveCaseStudy />;
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><Hero/><Projects/><Evidence/><About/></main><Footer/></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
