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
    <a className="wordmark" href="#top" aria-label="Engineering Evidence Lab, home"><span>R</span><i>/</i>W</a>
    <nav aria-label="Main navigation"><a href="#projects">Work</a><a href="#evidence">Evidence</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
    <a className="header-link" href="https://github.com/iamrushi100" target="_blank" rel="noreferrer">GitHub profile <Arrow diagonal /></a>
  </header>;
}

function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-scene"><DeferredIntelligenceField /></div>
    <div className="hero-content">
      <p className="eyebrow"><span className="status-dot" /> AI ENGINEERING · AI/ML · SOFTWARE · CYBERSECURITY</p>
<h1 id="hero-title">AI engineering<br/>for retrieval,<br/><em>evaluation,</em><br/>and security.</h1>
<p className="hero-copy">I’m a Computer Engineering graduate building software across retrieval, GenAI, and evaluation, with cybersecurity work shown through vulnerability prioritization.</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">Explore projects <Arrow /></a><a className="button button-quiet" href="https://github.com/iamrushi100" target="_blank" rel="noreferrer">View GitHub profile <Arrow diagonal /></a></div>
    </div>
    <div className="hero-meta"><span>ENGINEERING EVIDENCE LAB <i>—</i> 01</span><span className="scroll-cue"><span className="scroll-line"/> SCROLL TO EXPLORE</span></div>
    <div className="hero-visual-caption" aria-hidden="true">INTERCONNECTED SYSTEMS<br/><span>CURSOR RESPONSIVE FIELD / 01</span></div>
  </section>;
}

function ProjectVisual({ index }) {
  const titles = ['RETRIEVAL / RANKING', 'EVALUATION / COMPARISON', 'THREAT / PRIORITY'];
  return <div className={`project-visual project-visual-${index + 1}`} aria-hidden="true">
    <div className="visual-label">{titles[index]} <span>0{index + 1}</span></div>
    {index === 0 && <svg viewBox="0 0 620 340"><g className="diagram-grid">{Array.from({ length: 9 }, (_, i) => <path key={`v${i}`} d={`M${i * 77 + 3} 0V340`} />)}{Array.from({ length: 5 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 84 + 2}H620`} />)}</g><g className="diagram-links"><path d="M78 168 214 105 345 168 492 111M78 168 214 234 345 168 492 230M214 105 214 234M345 168 492 111 530 170 492 230" /></g><g className="diagram-points"><circle cx="78" cy="168" r="7"/><circle cx="214" cy="105" r="5"/><circle cx="214" cy="234" r="5"/><circle cx="345" cy="168" r="9"/><circle cx="492" cy="111" r="5"/><circle cx="492" cy="230" r="5"/><circle cx="530" cy="170" r="4"/></g><g className="diagram-caps"><text x="46" y="202">QUERY</text><text x="166" y="79">SEMANTIC</text><text x="179" y="260">BM25</text><text x="318" y="200">RRF</text><text x="465" y="84">RANK</text></g></svg>}
    {index === 1 && <svg viewBox="0 0 620 340"><g className="diagram-grid">{Array.from({ length: 9 }, (_, i) => <path key={`v${i}`} d={`M${i * 77 + 3} 0V340`} />)}{Array.from({ length: 5 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 84 + 2}H620`} />)}</g><g className="workflow-lines"><path d="M98 176H220M252 176H368M401 176H515" /></g><g className="workflow-boxes"><rect x="62" y="133" width="90" height="86" rx="2"/><rect x="220" y="133" width="90" height="86" rx="2"/><rect x="368" y="133" width="90" height="86" rx="2"/><rect x="515" y="133" width="53" height="86" rx="2"/></g><g className="diagram-points"><circle cx="98" cy="176" r="6"/><circle cx="266" cy="176" r="6"/><circle cx="414" cy="176" r="6"/><circle cx="541" cy="176" r="4"/></g><g className="diagram-caps"><text x="81" y="184">DATA</text><text x="238" y="184">TF-IDF</text><text x="387" y="184">METRIC</text><text x="523" y="184">DELTA</text></g></svg>}
    {index === 2 && <svg viewBox="0 0 620 340"><g className="diagram-grid">{Array.from({ length: 9 }, (_, i) => <path key={`v${i}`} d={`M${i * 77 + 3} 0V340`} />)}{Array.from({ length: 5 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 84 + 2}H620`} />)}</g><circle className="risk-orbit orbit-a" cx="310" cy="170" r="112"/><circle className="risk-orbit orbit-b" cx="310" cy="170" r="77"/><path className="risk-vector" d="M310 170 391 112M310 170 251 231M310 170 430 192"/><g className="diagram-points"><circle cx="310" cy="170" r="9"/><circle cx="391" cy="112" r="6"/><circle cx="251" cy="231" r="5"/><circle cx="430" cy="192" r="4"/></g><g className="diagram-caps"><text x="272" y="160">SIGNAL</text><text x="393" y="105">ASSET</text><text x="205" y="250">PRIORITY</text></g></svg>}
  </div>;
}

function ProjectShowcase({ project, index }) {
  return <article className={`project-showcase showcase-${index + 1}`}>
    <div className="project-copy">
      <div className="showcase-index"><span>0{index + 1}</span><span>{project.kind}</span></div>
      <p className="project-status"><i />{project.status}</p>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      {project.caseStudyPath ? <a className="case-note case-link" href={project.caseStudyPath}>OPEN CASE STUDY <span aria-hidden="true">↗</span></a> : <span className="case-note">CASE STUDY IN PREPARATION</span>}
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
    <div className="evidence-top">
      <p className="eyebrow">02 / ENGINEERING EVIDENCE</p>
      <span className="evidence-state"><i /> CHECKED-IN · PRIOR RUNS · NOT CAPTURED</span>
    </div>

    <div className="evidence-main">
      <h2 id="evidence-title">Claims should<br/><em>leave a trail.</em></h2>
      <p className="evidence-copy">
        I document how systems are built, how they are tested, what the results show,
        and where the evidence stops.
      </p>
    </div>

    <div className="evidence-list">
      {evidence.map((item, index) => (
        <div className="evidence-row" key={item.label}>
          <span className="evidence-number">0{index + 1}</span>
          <span className="evidence-name">{item.label} <span>· {item.status}{item.detail ? ` · ${item.detail}` : ''}</span></span>
          <span className="evidence-availability">{item.status}</span>
          <span className="evidence-arrow" aria-hidden="true" />
        </div>
      ))}
    </div>

    <p className="evidence-copy">
      CHECKED-IN means an artifact is stored in the corresponding project repository;
      these status rows are informational, not links. Project case studies connect
      implementation details with tests, results, decisions, and explicit limits.
    </p>
  </section>;
}

function About() {
  return <section className="about-section" id="about" aria-labelledby="about-title">
    <div className="about-serial">03<br/><span>ABOUT</span></div>
    <div className="about-main"><p className="eyebrow">SOFTWARE · AI · DATA · SECURITY</p><h2 id="about-title">Building with curiosity.<br/><em>Engineering with evidence.</em></h2></div>
    <div className="about-detail">
      <p>I’m a Computer Engineering graduate with Cybersecurity Honors, building practical software across backend engineering, machine learning, GenAI, data, and intelligent applications.</p>
      <p>I like working across the full path from data and system design to implementation, evaluation, and iteration. I care about understanding how a system works, measuring whether it works, and making its limitations clear.</p>
    </div>
    <div className="skills-grid" aria-label="Technical skills">
      <div className="skill-group">
        <p className="skill-label">DEMONSTRATED · SOFTWARE</p>
        <p>Python · FastAPI · REST APIs · SQLite</p>
      </div>
      <div className="skill-group">
        <p className="skill-label">DEMONSTRATED · AI / ML</p>
        <p>scikit-learn · Sentence Transformers · semantic retrieval · TF-IDF</p>
      </div>
      <div className="skill-group">
        <p className="skill-label">DEMONSTRATED · GENAI / RETRIEVAL</p>
        <p>RAG · BM25 · hybrid retrieval · RRF · retrieval evaluation · Streamlit · SQLite</p>
      </div>
      <div className="skill-group">
        <p className="skill-label">DEMONSTRATED · CYBERSECURITY</p>
        <p>Vulnerability prioritization · NVD / KEV / EPSS client integration</p>
      </div>
      <div className="skill-group skill-group-other">
        <p className="skill-label">OTHER TOOLS / TECHNOLOGIES</p>
        <div className="other-skill-groups">
          <p><span className="skill-sub-label">ML / DATA</span>PyTorch · TensorFlow · NLP · Machine Learning · Data Analysis · pandas · NumPy · EDA</p>
          <p><span className="skill-sub-label">DEVELOPMENT / FRAMEWORKS</span>SQL · Git · Docker · LangChain</p>
          <p><span className="skill-sub-label">SECURITY</span>Cybersecurity · Security Engineering</p>
        </div>
      </div>
    </div>
  </section>;
}

function Footer() {
  return <footer id="contact"><div className="footer-main"><div><p className="eyebrow">04 / CONTACT</p><h2>Let’s start with<br/><em>the work itself.</em></h2></div><div className="footer-contact"><p>Project repositories and current work</p><a className="button button-primary" href="https://github.com/iamrushi100" target="_blank" rel="noreferrer">View GitHub profile <Arrow diagonal /></a><div className="reserved"><span>RESERVED</span><p>Resume · Email · LinkedIn<br/><small>Contact links will be added when confirmed.</small></p></div></div></div><div className="footer-bottom"><a className="wordmark" href="#top" aria-label="Back to top"><span>R</span><i>/</i>W</a><span>BUILDING IN PUBLIC, WITH EVIDENCE.</span><a href="#top">BACK TO TOP ↑</a></div></footer>;
}

function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/projects/project-3") {
    return <ProjectThreeCaseStudy />;
  }
  if (window.location.pathname.replace(/\/$/, "") === "/projects/project-1") {
    return <ProjectOneCaseStudy />;
  }
  if (window.location.pathname.replace(/\/$/, "") === "/projects/project-5") {
    return <ProjectFiveCaseStudy />;
  }
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><Hero/><Projects/><Evidence/><About/></main><Footer/></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);




