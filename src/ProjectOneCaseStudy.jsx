import React from 'react';
import { projectOne as project } from './project-one-data.js';
import './project-one.css';
import { CaseStudySection } from './CaseStudyLayout.jsx';
import DemoVideoSlot from './DemoVideoSlot.jsx';

function CaseStudyHero() {
  return <section className="p1-hero" aria-labelledby="p1-title">
    <div className="p1-hero-copy">
      <p className="p1-eyebrow"><span /> RETRIEVAL ENGINEERING / RUSHIKESH WANI</p>
      <h1 id="p1-title">{project.title}</h1>
      <p className="p1-lede">{project.description}</p>
      <p className="p1-status"><span>STATUS</span>{project.status}</p>
      <ul className="p1-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="p1-actions">
        {project.repositoryUrl && <a className="p1-button p1-button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">View GitHub repository <span aria-hidden="true">↗</span></a>}
        <a className="p1-button" href="/#projects">Return to portfolio <span aria-hidden="true">←</span></a>
      </div>
      <p className="p1-source-status">{project.sourceStatus}</p>
    </div>
    <div className="p1-hero-mark" aria-hidden="true"><div className="p1-mark-orbit orbit-a"/><div className="p1-mark-orbit orbit-b"/><div className="p1-mark-link link-a"/><div className="p1-mark-link link-b"/><div className="p1-mark-node node-query">QUERY</div><div className="p1-mark-node node-vector">VECTOR</div><div className="p1-mark-node node-lexical">BM25</div><div className="p1-mark-core">R<span>·</span>R</div><p>RANKS → FUSED EVIDENCE</p></div>
  </section>;
}

function P1Header() {
  return <header className="p1-header"><a href="/#top" className="p1-brand" aria-label="Rushikesh Wani, home"><b>R</b>/W <span>RUSHIKESH WANI</span></a><nav aria-label="Case study navigation"><a href="/#projects">All work</a><a href="#architecture">Architecture</a><a href="#evaluation">Evaluation</a><a href="#scope">Scope</a><a href="/#contact">Contact</a><a href="/#contact">Resume</a></nav></header>;
}

function Pipeline({ items, label }) {
  return <ol className="p1-pipeline" aria-label={label}>{items.map((item, index) => <li key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ol>;
}

function ArchitectureDiagram() {
  const { architecture } = project;
  return <div className="p1-architecture-diagram">
    <div className="p1-layer"><span className="p1-layer-label">INGESTION → PERSISTENCE</span><Pipeline items={architecture.ingestion} label="Documents through ingestion, parsing, chunking, and SQLite storage"/></div>
    <div className="p1-down-arrow" aria-hidden="true">↓</div>
    <div className="p1-retrieval-layer"><span className="p1-layer-label">PARALLEL RETRIEVAL FROM STORED CHUNKS</span><div className="p1-retrievers">{architecture.indexes.map((index, i) => <article key={index.title}><span>0{i + 1} / INDEX</span><h3>{index.title}</h3><p>{index.detail}</p></article>)}</div></div>
    <div className="p1-merge-lines" aria-hidden="true"><span/><i>↓</i></div>
    <article className="p1-fusion-node"><span>RANK FUSION</span><h3>{architecture.fusion.title}</h3><p>{architecture.fusion.detail}</p><code>Σ 1 / (k + rank)</code></article>
    <div className="p1-down-arrow" aria-hidden="true">↓</div>
    <div className="p1-output-node"><span>RETRIEVAL RESULTS</span><p>{architecture.output.detail}</p></div>
    <div className="p1-down-arrow" aria-hidden="true">↓</div>
    <div className="p1-output-node p1-evaluation-node"><span>EVALUATION HARNESS</span><p>{architecture.evaluation.detail}</p></div>
    <p className="p1-architecture-note">{architecture.persistence} {architecture.interface}</p>
  </div>;
}

function EvidenceCard({ index, title, children }) {
  return <article className="p1-evidence-card"><span>0{index} / IMPLEMENTATION</span><h3>{title}</h3><div>{children}</div></article>;
}

function MethodCard({ method }) {
  const meanings = {
    semantic: 'Finds related wording through embedding similarity, including paraphrases without exact token overlap.',
    bm25: 'Ranks token overlap with term-frequency, inverse-document-frequency, and length normalization; useful for identifiers and exact terms.',
    hybrid: 'Combines one-based ranks from both retrievers, deduplicates chunks, and orders ties deterministically.',
  };
  return <article className="p1-method-card"><span>{method.index}</span><h3>{method.title}</h3><p>{method.detail}</p><p className="p1-method-note">{meanings[method.key]}</p></article>;
}

function MetricTable() {
  const methods = project.evaluation.aggregates;
  return <div className="p1-metric-table-wrap"><table className="p1-metric-table"><caption>Answerable-only macro averages · {project.evaluation.answerableCases} questions</caption><thead><tr><th scope="col">Method</th><th scope="col">K</th><th scope="col">Recall@K</th><th scope="col">Precision@K</th><th scope="col">MRR@K</th></tr></thead><tbody>{methods.flatMap(method => method.values.map(row => <tr key={`${method.key}-${row.k}`}><th scope="row">{method.method}</th><td>{row.k}</td><td>{row.recall.toFixed(4)}</td><td>{row.precision.toFixed(4)}</td><td>{row.mrr.toFixed(4)}</td></tr>))}</tbody></table></div>;
}

function EvidenceMetric({ value, label, detail }) {
  return <article className="p1-evaluation-metric"><b>{value}</b><span>{label}</span>{detail && <p>{detail}</p>}</article>;
}

function ProjectOneCaseStudy() {
  const evaluation = project.evaluation;
  const generation = project.generation;
  const semantic = project.semantic;
  const lexical = project.lexical;
  const hybrid = project.hybrid;
  const methods = evaluation.aggregates.map((method, i) => ({ ...method, index: `0${i + 1}` }));
  return <div className="p1-case"><a className="p1-skip" href="#p1-main">Skip to case study</a><P1Header/><main id="p1-main">
    <CaseStudyHero/>
    <DemoVideoSlot title={project.title} />
    <section className="p1-fast-scan" aria-label="Project summary"><article><span>PROBLEM</span><p>Find the relevant passage in uploaded PDF, DOCX, and TXT files.</p></article><article><span>WHAT I BUILT</span><p>FastAPI ingestion, semantic and BM25 retrieval, RRF rank fusion, evaluation, and a separate /ask route.</p></article><article><span>KEY RESULT</span><p>Recall@5 and MRR tie at 1.0 for semantic and hybrid on the 30-question fixture; no hybrid advantage was measured.</p></article></section>

    <CaseStudySection id="problem" number="01" title="Find the source passage before answering"><p>The system turns uploaded PDF, DOCX, and TXT files into searchable passages with document and page metadata. A single retrieval signal can miss evidence in different ways: keyword search depends on term overlap, while semantic similarity can miss an exact identifier or error code. Embeddings help find passages phrased differently from a query; BM25 adds a lexical signal for exact technical terms. The system compares both paths and fuses their rankings.</p><p>A separate <code>/ask</code> route connects hybrid retrieval to a generator, using a mock by default. The evaluation described here measures passage retrieval only; it does not score generated answers or establish answer correctness.</p><div className="p1-decision-callout"><b>FIXTURE RESULT</b><p>The documented fixture shows no measured hybrid advantage over semantic retrieval; both tie across the displayed metrics.</p></div></CaseStudySection>

    <CaseStudySection id="architecture" number="02" title="One ingestion path, two retrieval signals"><p>FastAPI accepts uploads, validates and parses them, normalizes text, and creates overlapping chunks. It generates normalized embeddings and versioned lexical tokens, then stores the document, chunks, and both index representations in SQLite. Search runs semantic and BM25 ranking as parallel candidate paths; RRF merges those ranked lists. The evaluation runner uses the same parser, chunker, and retrieval services against labeled fixture questions. The separate <code>/ask</code> path passes retrieved context to generation after retrieval.</p><ArchitectureDiagram/></CaseStudySection>

    <CaseStudySection id="ingestion" number="03" title="Validate inputs and retain source metadata"><div className="p1-evidence-grid"><EvidenceCard index="1" title="Check upload and file structure"><p>Accepts PDF, DOCX, and TXT, with a configurable {project.ingestion.maxUploadBytes / (1024 * 1024)} MiB default upload cap. {project.ingestion.validation} {project.ingestion.duplicateHandling}</p></EvidenceCard><EvidenceCard index="2" title="Parse and normalize text"><p>PDF text is extracted page by page; DOCX paragraphs and TXT content form one unpaginated text unit. NFKC normalization, null-byte removal, and whitespace cleanup preserve paragraph breaks. Empty PDF pages are omitted. Scanned PDFs have no OCR path.</p></EvidenceCard><EvidenceCard index="3" title="Persist document and indexes together"><p>{project.ingestion.persistence} Page numbers are retained where available; section values are not generated by the current chunker.</p></EvidenceCard></div></CaseStudySection>

    <CaseStudySection id="chunking" number="04" title="Chunking creates the retrieval unit"><p>The configured default is {project.chunking.sizeCharacters} characters with {project.chunking.overlapCharacters} characters of overlap; the checked-in evaluation used the same settings. {project.chunking.strategy}</p><p>{project.chunking.rationale}</p><div className="p1-decision-callout"><b>TRADE-OFF</b><p>Character counts are simple to configure and paragraph boundaries preserve readable passages, but chunk size is not token-aware. Overlap repeats some text in storage and retrieval.</p></div></CaseStudySection>

    <CaseStudySection id="semantic" number="05" title="Semantic retrieval scores every stored vector"><p>Chunks and queries use <code>{semantic.model}</code>, which produces {semantic.dimensions}-dimensional embeddings. {semantic.details}</p><p>{semantic.limitations}</p></CaseStudySection>

    <CaseStudySection id="lexical" number="06" title="BM25 preserves exact-term evidence"><p>{lexical.implementation} {lexical.details}</p><p>{lexical.rationale} {lexical.limitations}</p></CaseStudySection>

    <CaseStudySection id="hybrid" number="07" title="RRF fuses rankings rather than unlike scores"><p>{hybrid.rationale} {hybrid.behavior}</p><div className="p1-rrf-equation"><span>RECIPROCAL RANK FUSION</span><code>RRF(chunk) = Σ 1 / ({evaluation.rrfConstant} + one-based rank)</code><p>{hybrid.maximumCandidatePool} RRF is a ranking rule; a better rank on this fixture does not establish a general retrieval improvement.</p></div><div className="p1-method-grid">{methods.map(method => <MethodCard key={method.key} method={method}/>)}</div></CaseStudySection>

    <CaseStudySection id="rag-generation" number="08" title="A separate /ask path builds context and generates"><p><code>{generation.endpoint}</code> connects the existing hybrid retriever to a text generator. It selects top-ranked chunks, formats them as source-labeled context, and returns the answer with source metadata. This is an implemented request path; answer quality is not part of the retrieval evaluation.</p><div className="p1-evidence-grid"><EvidenceCard index="1" title="Build inspectable context"><p>{generation.context}</p></EvidenceCard><EvidenceCard index="2" title="Use a deterministic default"><p>{generation.mock}</p></EvidenceCard><EvidenceCard index="3" title="Allow an optional provider"><p>{generation.openai}</p></EvidenceCard><EvidenceCard index="4" title="Handle empty retrieval"><p>{generation.empty}</p></EvidenceCard><EvidenceCard index="5" title="Contain provider failures"><p>{generation.failure}</p></EvidenceCard></div><p className="p1-note">{generation.caveat}</p></CaseStudySection>

    <CaseStudySection id="evaluation-data" number="09" title="The checked-in fixture is small but traceable"><p>{evaluation.corpusDescription} These manually authored questions label relevant source files; the runner validates those labels, parses the TXT fixtures, chunks them, and maps each source label to its generated chunk IDs. The current eight documents each produce one chunk.</p><div className="p1-evaluation-metrics"><EvidenceMetric value={`${evaluation.cases}`} label="AUTHORED QUESTIONS" detail="Checked-in fixture dataset"/><EvidenceMetric value={`${evaluation.answerableCases} / ${evaluation.unanswerableCases}`} label="ANSWERABLE / UNANSWERABLE"/><EvidenceMetric value={`${evaluation.corpusDocuments} → ${evaluation.corpusChunks}`} label="CORPUS DOCS → CHUNKS" detail="One chunk per source in this run"/><EvidenceMetric value={`${evaluation.candidateDepthPerRetriever}`} label="CANDIDATES PER RETRIEVER" detail={`K cutoffs: ${evaluation.ks.join(', ')}`}/></div><div className="p1-category-list"><span>QUESTION CATEGORIES</span><p>Exact identifier · paraphrase · ordinary question · technical terminology · unanswerable</p></div><p className="p1-note">{evaluation.comparisonMethod}</p></CaseStudySection>

    <CaseStudySection id="metrics" number="10" title="Metrics score retrieved evidence, not answers"><p>Metrics are calculated per question and macro-averaged across cases. Duplicate retrieved chunk IDs are collapsed before scoring. For an unanswerable case the relevant set is empty, so all three metrics are explicitly zero; the report exposes answerable-only and all-case aggregates separately.</p><div className="p1-metric-definitions">{evaluation.metricDefinitions.map((metric, i) => <article key={metric.name}><span>0{i + 1}</span><h3>{metric.name}</h3><p>{metric.detail}</p></article>)}</div></CaseStudySection>

    <CaseStudySection id="evaluation" number="11" title="Fixture results compare the three retrieval paths"><div className="p1-results-banner"><b>{evaluation.label}</b><span>Saved report · not a real-world or production result</span></div><p>These are the answerable-only macro averages in <code>{evaluation.resultPath}</code>, across {evaluation.answerableCases} questions. All methods used the same inputs, candidate depth, and metric cutoffs.</p><MetricTable/><p className="p1-note">{evaluation.interpretation} {evaluation.caveat}</p></CaseStudySection>

    <CaseStudySection id="evidence" number="12" title="Tests and saved artifacts answer different questions"><div className="p1-evidence-metrics"><EvidenceMetric value={project.evidence.documentedTestRun} label="DOCUMENTED PRIOR RUN" detail={`Documented prior repository run · ${project.evidence.testModules} test modules`}/><EvidenceMetric value="3" label="RETRIEVAL METHODS" detail="Semantic · BM25 · Hybrid"/><EvidenceMetric value="2" label="SAVED RESULT FORMATS" detail="Aggregate JSON · per-question CSV"/></div><div className="p1-artifact-list">{project.evidence.artifacts.map(item => <article key={item.path}><span>{item.status}</span><h3>{item.name}</h3><code>{item.path}</code></article>)}</div><p className="p1-note"><strong>Test coverage:</strong> {project.evidence.testCoverage.join('; ')}. These automated tests validate defined behavior; the saved experiment measures retrieval rankings on the authored fixture. {project.evidence.testStatus}</p></CaseStudySection>

    <CaseStudySection id="decisions" number="13" title="Decisions favor inspectability at local scale"><div className="p1-decision-grid">{project.decisions.map((decision, i) => <article key={decision.title}><span>0{i + 1} / TRADE-OFF</span><h3>{decision.title}</h3><p>{decision.detail}</p></article>)}</div></CaseStudySection>

    <CaseStudySection id="scope" number="14" title="Scope & limitations"><ul className="p1-scope-list">{project.limitations.map(item => <li key={item}>{item}</li>)}</ul></CaseStudySection>

    <CaseStudySection id="next-steps" number="15" title="Next engineering steps"><ol className="p1-next-steps">{project.nextSteps.map((item, i) => <li key={item}><span>0{i + 1}</span><p>{item}</p></li>)}</ol></CaseStudySection>

    <CaseStudySection id="links" number="16" title="Source & artifacts"><p>{project.sourceStatus}</p><div className="p1-link-row">{project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Open GitHub repository <span aria-hidden="true">↗</span></a>}<a href="/#projects">Return to selected work <span aria-hidden="true">←</span></a><span>Evaluation artifacts are identified above by repository-relative path.</span></div></CaseStudySection>
  </main><footer className="p1-footer"><a href="/#projects">← Back to selected work</a><span>RUSHIKESH WANI · DOCUMENT RETRIEVAL</span><a href="/#contact">CONTACT / RESUME</a><a href="#p1-main">BACK TO TOP ↑</a></footer></div>;
}

export default ProjectOneCaseStudy;
