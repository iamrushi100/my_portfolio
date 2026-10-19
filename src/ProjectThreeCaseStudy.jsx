import React from 'react';
import { projectThree as project } from './project-three-data.js';
import './project-three.css';
import DemoVideoSlot from './DemoVideoSlot.jsx';

function P3Header() {
  return <header className="p3-header"><a href="/#top" className="p3-brand" aria-label="Rushikesh Wani, home"><b>R</b>/W <span>RUSHIKESH WANI</span></a><nav aria-label="Case study navigation"><a href="/#projects">All work</a><a href="#architecture">Architecture</a><a href="#evidence">Evidence</a><a href="#regression">Experiment</a><a href="#scope">Scope</a><a href="/#contact">Contact</a><a href="/Rushikesh_Wani_Portfolio_Resume.pdf" target="_blank" rel="noreferrer">Resume</a></nav></header>;
}
function CaseStudyHero() {
  return <section className="p3-hero" aria-labelledby="p3-title"><div className="p3-hero-copy">
    <p className="p3-eyebrow"><span/> RETRIEVAL QUALITY / RUSHIKESH WANI</p>
    <h1 id="p3-title">{project.title}</h1>
    <p className="p3-lede">{project.description} The system evaluates retrieval; it does not generate or judge answers.</p>
    <p className="p3-status"><span>STATUS</span>{project.status}</p>
    <ul className="p3-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    <div className="p3-actions">{project.repositoryUrl && <a className="p3-button p3-button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">View GitHub repository <span aria-hidden="true">↗</span></a>}<a className="p3-button" href="/#projects">Return to portfolio <span aria-hidden="true">←</span></a></div>
    <p className="p3-source-status">{project.sourceStatus}</p>
  </div><div className="p3-hero-visual" aria-hidden="true"><div className="p3-ring ring-a"/><div className="p3-ring ring-b"/><div className="p3-hero-node query">QUESTION</div><div className="p3-hero-node chunks">CHUNKS</div><div className="p3-hero-node metrics">METRICS</div><div className="p3-hero-core">R<span>·</span>W</div><p>RANK → MEASURE → INSPECT</p></div></section>;
}

function Section({ id, number, title, children }) {
  return <section className="p3-section" id={id} aria-labelledby={`${id}-title`}><div className="p3-section-label"><span>{number}</span><i/> EVALUATION SYSTEM</div><div className="p3-section-body"><h2 id={`${id}-title`}>{title}</h2>{children}</div></section>;
}

function ArchitectureFlow() {
  return <ol className="p3-architecture-flow" aria-label="RAGWatch evaluation architecture">{project.architecture.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>)}</ol>;
}

function RetrievalPipeline() {
  return <ol className="p3-retrieval-pipeline" aria-label="TF-IDF retrieval pipeline">{project.retrievalPipeline.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol>;
}

function MetricCard({ metric }) {
  const value = metric.name === 'Recall@k' ? project.metrics.recallAtK : metric.name === 'MRR' ? project.metrics.mrr : project.metrics.ndcgAtK;
  return <article className="p3-metric-card"><span>{metric.name}</span><b>{value.toFixed(3)}</b><p>{metric.value}</p></article>;
}

function RegressionTable() {
  return <div className="p3-table-wrap"><table className="p3-results-table"><caption>Aggregate metrics · k = 2 · {project.regression.questionCount} fictional questions</caption><thead><tr><th scope="col">Metric</th><th scope="col">TF-IDF baseline</th><th scope="col">Reversed ranking</th><th scope="col">Candidate − baseline</th></tr></thead><tbody>{project.regression.metrics.map(row => <tr key={row.key}><th scope="row">{row.name}</th><td>{row.baseline.toFixed(3)}</td><td>{row.degraded.toFixed(3)}</td><td className="p3-negative">{row.difference.toFixed(3)}</td></tr>)}</tbody></table></div>;
}

function EvidenceCard({ item, index }) {
  return <article className="p3-evidence-card"><span>0{index + 1} / EVIDENCE</span><h3>{item.label}</h3><p>{item.detail}</p>{item.url && <a className="p3-evidence-link" href={item.url} target="_blank" rel="noreferrer">Open verified workflow run <span aria-hidden="true">↗</span></a>}</article>;
}

const visualEvidence = [
  {
    src: '/screens/ragwatch/ragwatch-evaluation.png',
    alt: 'RAGWatch Streamlit dashboard with the checked-in demo evaluation report selected, showing aggregate and per-question results.',
    caption: 'RAGWatch — retrieval-quality evaluation interface.',
    primary: true,
  },
  {
    src: '/screens/ragwatch/ragwatch-metrics.png',
    alt: 'RAGWatch dashboard report values for Recall at 2, MRR, nDCG at 2, and six fictional questions.',
    caption: 'Evaluation evidence — Recall@k, MRR and nDCG@k.',
  },
];

function EvidenceGallery() {
  return <div className="p3-visual-evidence-grid">
    {visualEvidence.map((item, index) => <figure className={`p3-visual-evidence-card${item.primary ? ' is-primary' : ''}`} key={item.src}>
      <a href={item.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${item.caption}`}>
        <img src={item.src} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} />
      </a>
      <figcaption>{item.caption}</figcaption>
    </figure>)}
  </div>;
}

function ProjectThreeCaseStudy() {
  const q = project.regression.questionExample;
  return <div className="p3-case"><a className="p3-skip" href="#p3-main">Skip to case study</a><P3Header/><main id="p3-main">
    <CaseStudyHero/>
    <DemoVideoSlot title={project.title} />
    <section className="p3-fast-scan" aria-label="Project summary"><article><span>PROBLEM</span><p>Measure whether a retrieval ranking change improves or degrades relevant evidence order.</p></article><article><span>WHAT I BUILT</span><p>A TF-IDF baseline, retrieval metrics, CLI reports, SQLite run history, and a read-only Streamlit dashboard.</p></article><article><span>KEY RESULT</span><p>MRR fell from 0.833 to 0.087 when all rankings were reversed in a six-question fictional fixture.</p></article></section>

    <Section id="problem" number="01" title="Measure retrieval before evaluating answers"><p>Retrieval changes need a repeatable way to check whether labeled evidence appears near the top of a ranking. RAGWatch isolates that question: validate a small dataset, rank chunks for each question, calculate graded retrieval metrics, and inspect the per-question results.</p><p>It is a standalone, local-first evaluation tool. It evaluates retrieval quality only; it does not generate answers, decide whether an answer is correct, or use an LLM judge.</p><div className="p3-callout"><b>RESULT SUMMARY</b><p>{project.overviewSummary}</p></div></Section>

    <Section id="architecture" number="02" title="A small evaluation pipeline with optional persistence"><p>The ordinary run validates the input and derives chunks once, then records retrieval output, per-question metrics, and aggregate means. Threshold checks, diagnostics, JSON export, and SQLite storage are optional CLI behavior. The dashboard reads reports and saved history; it does not run an evaluation.</p><ArchitectureFlow/><div className="p3-output-flow"><span>CLI OUTPUT</span><i aria-hidden="true">→</i><span>JSON REPORT</span><i aria-hidden="true">→</i><span>READ-ONLY STREAMLIT</span><b>Optional SQLite run history</b></div></Section>

    <Section id="retrieval-pipeline" number="03" title="A deterministic TF-IDF retrieval baseline"><p>Chunk text and a question are vectorized with scikit-learn’s TF-IDF implementation. Cosine similarity ranks every derived chunk; exact ties resolve by chunk ID so the same inputs produce a stable ordering.</p><RetrievalPipeline/><div className="p3-dataset-strip"><span className="p3-fixture-tag">FICTIONAL DATASET</span><b>{project.dataset.id}</b><span>Schema v{project.dataset.schemaVersion}</span><span>{project.dataset.sourceDocuments} source documents</span><span>{project.dataset.derivedChunks} derived chunks</span><span>{project.dataset.questions} questions</span><span>Grades {project.dataset.relevanceGradeRange}</span></div><p className="p3-note">Chunk size is {project.dataset.chunkSizeCharacters} characters with {project.dataset.overlapCharacters}-character overlap. {project.dataset.chunkIds}</p></Section>

    <Section id="metrics" number="04" title="Metrics describe ranked evidence"><p>The runner calculates metrics per question and reports equal-weight aggregate means. These metric definitions refer to labeled retrieval results, not generated-answer quality.</p><div className="p3-metric-banner">{project.metrics.label}<span>Saved report: {project.metrics.reportPath}</span></div><div className="p3-metric-grid">{project.metricDefinitions.map(metric => <MetricCard key={metric.name} metric={metric}/>)}</div></Section>

    <Section id="regression" number="05" title="A controlled ranking inversion checks the evaluator"><div className="p3-experiment-banner"><b>{project.regression.label}</b><span>{project.regression.experimentId}</span></div><p>{project.regression.change} The saved report records both aggregate and per-question metrics and computes candidate-minus-baseline differences.</p><RegressionTable/><div className="p3-question-comparison"><span>PER-QUESTION EXAMPLE · {q.id}</span><h3>{q.label}</h3><div><p><b>Normal TF-IDF</b><span>Recall@k {q.baseline.recallAtK.toFixed(3)} · MRR {q.baseline.reciprocalRank.toFixed(3)} · nDCG@k {q.baseline.ndcgAtK.toFixed(3)}</span></p><p><b>Reversed ranking</b><span>Recall@k {q.degraded.recallAtK.toFixed(3)} · MRR {q.degraded.reciprocalRank.toFixed(3)} · nDCG@k {q.degraded.ndcgAtK.toFixed(3)}</span></p></div></div><p className="p3-warning">{project.regression.caveat}</p><p className="p3-note">Source report: <code>{project.regression.reportPath}</code>. The normal baseline aggregate is also saved in <code>{project.metrics.reportPath}</code>.</p></Section>

    <Section id="failure-analysis" number="06" title="Diagnostics point to what failed, not why"><p>Optional per-question analysis compares the ranked IDs and graded labels. It emits deterministic labels and missing/misranked chunk IDs; it does not infer root cause.</p><div className="p3-diagnostic-grid">{project.failureDiagnostics.map(item => <article key={item.label}><code>{item.label}</code><p>{item.detail}</p></article>)}</div></Section>

    <Section id="evidence" number="07" title="Evidence from the running app and repository"><p>The images show the read-only dashboard with a checked-in fictional evaluation report selected. Metrics are sample-fixture results, not benchmark claims.</p><EvidenceGallery/><div className="p3-evidence-grid">{project.evidence.map((item, index) => <EvidenceCard key={item.label} item={item} index={index}/>)}</div><p className="p3-note">The successful GitHub Actions run is dated and tied to its commit below; it is not presented as a current run. The latest master commit after that run changed documentation and saved reports only.</p></Section>

    <Section id="decisions" number="08" title="Trade-offs are explicit"><div className="p3-decision-grid">{project.decisions.map((item, index) => <article key={item.title}><span>0{index + 1} / DECISION</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div></Section>

    <Section id="scope" number="09" title="Scope & limitations"><ul className="p3-scope-list">{project.limitations.map(item => <li key={item}>{item}</li>)}</ul></Section>

    <Section id="next-steps" number="10" title="Next engineering steps"><ol className="p3-next-list">{project.nextSteps.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol></Section>

    <Section id="links" number="11" title="Source & artifacts"><p>{project.sourceStatus}. The dataset, evaluation, and regression report are identified by repository-relative paths above.</p><div className="p3-link-row">{project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Open GitHub repository <span aria-hidden="true">↗</span></a>}<a href="/#projects">Return to selected work <span aria-hidden="true">←</span></a><span>RAGWatch · retrieval evaluation only</span></div></Section>
  </main><footer className="p3-footer"><a href="/#projects">← Back to selected work</a><span>RUSHIKESH WANI · RAGWATCH</span><a href="/#contact">CONTACT / RESUME</a><a href="#p3-main">BACK TO TOP ↑</a></footer></div>;
}

export default ProjectThreeCaseStudy;
