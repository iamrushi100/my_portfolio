import React from 'react';
import { projectOne as project } from './project-one-data.js';
import './project-one.css';

function CaseStudyHero() {
  return <section className="p1-hero" aria-labelledby="p1-title">
    <div className="p1-hero-copy">
      <p className="p1-eyebrow"><span /> RETRIEVAL ENGINEERING / CASE 01</p>
      <h1 id="p1-title">{project.title}</h1>
      <p className="p1-lede">{project.description}</p>
      <p className="p1-status"><span>STATUS</span>{project.status}</p>
      <ul className="p1-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="p1-actions">
        {project.repositoryUrl && <a className="p1-button p1-button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">View source <span aria-hidden="true">↗</span></a>}
        <a className="p1-button" href="/#projects">Return to portfolio <span aria-hidden="true">←</span></a>
      </div>
      <p className="p1-source-status">{project.sourceStatus}</p>
    </div>
    <div className="p1-hero-mark" aria-hidden="true"><div className="p1-mark-orbit orbit-a"/><div className="p1-mark-orbit orbit-b"/><div className="p1-mark-link link-a"/><div className="p1-mark-link link-b"/><div className="p1-mark-node node-query">QUERY</div><div className="p1-mark-node node-vector">VECTOR</div><div className="p1-mark-node node-lexical">BM25</div><div className="p1-mark-core">R<span>·</span>R</div><p>RANKS → FUSED EVIDENCE</p></div>
  </section>;
}

function P1Header() {
  return <header className="p1-header"><a href="/#top" className="p1-brand" aria-label="Engineering Evidence Lab, home"><b>R</b>/W <span>ENGINEERING EVIDENCE LAB</span></a><nav aria-label="Case study navigation"><a href="/#projects">All work</a><a href="#architecture">Architecture</a><a href="#evaluation">Evaluation</a><a href="#scope">Scope</a></nav></header>;
}

function Section({ id, number, title, children }) {
  return <section className="p1-section" id={id} aria-labelledby={`${id}-title`}><div className="p1-section-label"><span>{number}</span><i/> RETRIEVAL SYSTEM</div><div className="p1-section-body"><h2 id={`${id}-title`}>{title}</h2>{children}</div></section>;
}

function Pipeline({ items, label }) {
  return <ol className="p1-pipeline" aria-label={label}>{items.map((item, index) => <li key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ol>;
}

function ArchitectureDiagram() {
  const { architecture } = project;
  return <div className="p1-architecture-diagram">
    <div className="p1-layer"><span className="p1-layer-label">DOCUMENT INGESTION</span><Pipeline items={architecture.ingestion} label="Document upload and indexing pipeline"/></div>
    <div className="p1-down-arrow" aria-hidden="true">↓</div>
    <div className="p1-retrieval-layer"><span className="p1-layer-label">PARALLEL RETRIEVAL</span><div className="p1-retrievers">{architecture.indexes.map((index, i) => <article key={index.title}><span>0{i + 1} / INDEX</span><h3>{index.title}</h3><p>{index.detail}</p></article>)}</div></div>
    <div className="p1-merge-lines" aria-hidden="true"><span/><i>↓</i></div>
    <article className="p1-fusion-node"><span>RANK FUSION</span><h3>{architecture.fusion.title}</h3><p>{architecture.fusion.detail}</p><code>Σ 1 / (k + rank)</code></article>
    <div className="p1-down-arrow" aria-hidden="true">↓</div>
    <div className="p1-output-node"><span>RETRIEVAL RESULTS</span><p>Ranked chunks with source metadata</p></div>
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
  return <div className="p1-metric-table-wrap"><table className="p1-metric-table"><caption>Answerable-only macro averages · 26 questions</caption><thead><tr><th scope="col">Method</th><th scope="col">K</th><th scope="col">Recall@K</th><th scope="col">Precision@K</th><th scope="col">MRR@K</th></tr></thead><tbody>{methods.flatMap(method => method.values.map(row => <tr key={`${method.key}-${row.k}`}><th scope="row">{method.method}</th><td>{row.k}</td><td>{row.recall.toFixed(4)}</td><td>{row.precision.toFixed(4)}</td><td>{row.mrr.toFixed(4)}</td></tr>))}</tbody></table></div>;
}

function EvidenceMetric({ value, label, detail }) {
  return <article className="p1-evaluation-metric"><b>{value}</b><span>{label}</span>{detail && <p>{detail}</p>}</article>;
}

function ProjectOneCaseStudy() {
  const evaluation = project.evaluation;
  const methods = evaluation.aggregates.map((method, i) => ({ ...method, index: `0${i + 1}` }));
  return <div className="p1-case"><a className="p1-skip" href="#p1-main">Skip to case study</a><P1Header/><main id="p1-main">
    <CaseStudyHero/>

    <Section id="problem" number="01" title="Retrieval quality is the engineering problem"><p>Document question answering depends on finding the right evidence before anything downstream can be grounded. Exact identifiers and technical terms reward lexical matching; paraphrases can require semantic similarity. A useful system needs both retrieval paths and a way to inspect whether they find labeled evidence.</p><p>This project implements document ingestion, three retrieval modes, and a deterministic evaluation harness. It does not currently generate answers or establish answer quality.</p></Section>

    <Section id="architecture" number="02" title="One ingestion path, two retrieval signals"><p>The service stores parsed chunks and both index representations in SQLite. FastAPI exposes the ingestion and retrieval endpoints, while the local browser interface submits documents and queries.</p><ArchitectureDiagram/></Section>

    <Section id="ingestion" number="03" title="Ingestion preserves source boundaries"><div className="p1-evidence-grid"><EvidenceCard index="1" title="Validate and parse"><p>Accepts PDF, DOCX, and TXT. PDF pages retain page numbers; DOCX/TXT are treated as one unpaginated text unit. Invalid, empty, or unreadable inputs are rejected.</p></EvidenceCard><EvidenceCard index="2" title="Normalize without flattening paragraphs"><p>Unicode NFKC normalization, null-byte removal, and whitespace cleanup are applied while paragraph breaks are retained. PDF pages with no extractable text are omitted; there is no OCR path.</p></EvidenceCard><EvidenceCard index="3" title="Store source metadata"><p>Document metadata includes a SHA-256 duplicate key. Chunks carry document identity/name and page number where parsed; the current chunker does not populate section labels.</p></EvidenceCard></div></Section>

    <Section id="chunking" number="04" title="Chunking is configurable and paragraph-aware"><p>The checked-in evaluation used {evaluation.chunkSizeCharacters}-character chunks with {evaluation.chunkOverlapCharacters}-character overlap. The chunker prefers paragraph boundaries, splits oversized paragraphs at character edges, then carries a tail of the previous piece into the next.</p><div className="p1-decision-callout"><b>Trade-off</b><p>Character-based limits are straightforward and preserve useful paragraph boundaries, but they are not token-aware. Overlap retains context across cuts while repeating some text in the index.</p></div></Section>

    <Section id="semantic" number="05" title="Semantic retrieval ranks normalized vectors"><p>Chunks and queries are encoded with <code>sentence-transformers/all-MiniLM-L6-v2</code>. The model loads lazily once per process on CPU; normalized float32 vectors are stored as SQLite BLOBs. Query ranking uses dot products, equivalent to cosine similarity for normalized vectors, with a stable top-K ordering.</p><p>For a small local corpus the exact scan is easy to inspect. Its work grows linearly with the number of indexed chunks, and the model weights require a first-use download.</p></Section>

    <Section id="lexical" number="06" title="BM25 keeps exact terms in play"><p>The lexical path uses BM25Okapi from <code>rank-bm25</code>. Its simple-v1 tokenizer lowercases terms while retaining separators used in technical identifiers, including hyphens, underscores, periods, and slashes. Versioned token lists are persisted beside chunks.</p><p>A scorer and corpus statistics are rebuilt for each lexical request. This keeps the small-corpus implementation direct, at the cost of repeated work as the index grows. BM25 scores are ranking values, not probabilities.</p></Section>

    <Section id="hybrid" number="07" title="RRF combines ranks without mixing score scales"><p>Hybrid search asks both retrievers for their top-K candidates, deduplicates by chunk ID, then adds a reciprocal-rank contribution from each list. The configured RRF constant is {evaluation.rrfConstant}; missing ranks contribute zero, and ties are resolved by best component rank and chunk ID.</p><div className="p1-rrf-equation"><span>RECIPROCAL RANK FUSION</span><code>RRF(chunk) = Σ 1 / ({evaluation.rrfConstant} + rank)</code><p>Rank positions start at 1. Semantic similarity and BM25 scores stay in their own retrieval paths; the fusion uses rank positions.</p></div><div className="p1-method-grid">{methods.map(method => <MethodCard key={method.key} method={method}/>)}</div><p className="p1-note">RRF is an implemented fusion method. Whether it helps depends on data and queries; the evaluation below shows the measured outcome on this particular small set.</p></Section>

    <Section id="evaluation-data" number="08" title="A versioned, reviewable evaluation set"><p>The checked-in dataset labels relevant corpus sources for each question. The runner parses and chunks those same source files with the production parser and chunker, then maps every generated chunk from a labeled source as relevant. It validates labels against corpus filenames before indexing.</p><div className="p1-evaluation-metrics"><EvidenceMetric value={`${evaluation.cases}`} label="QUESTIONS" detail="Dataset cases"/><EvidenceMetric value={`${evaluation.answerableCases} / ${evaluation.unanswerableCases}`} label="ANSWERABLE / UNANSWERABLE"/><EvidenceMetric value={`${evaluation.corpusDocuments} → ${evaluation.corpusChunks}`} label="CORPUS DOCS → CHUNKS" detail="This run produced one chunk per document"/><EvidenceMetric value={`${evaluation.candidateDepthPerRetriever}`} label="CANDIDATES PER RETRIEVER" detail={`K cutoffs: ${evaluation.ks.join(', ')}`}/></div><div className="p1-category-list"><span>QUESTION TYPES IN DATASET</span><p>Exact identifier · paraphrase · ordinary question · technical terminology · unanswerable</p></div><p className="p1-note">The runner uses an isolated temporary SQLite database and identical candidate depth for semantic, BM25, and hybrid. Reports include input hashes, model/library metadata, retrieved IDs, scores, and per-question metrics.</p></Section>

    <Section id="metrics" number="09" title="Metrics describe ranked evidence, not answer quality"><p>The implementation computes recall, precision, and mean reciprocal rank at K. It removes duplicate chunk IDs before scoring; precision uses K result slots, so missing slots count as non-relevant. Empty relevance sets are explicitly assigned zero and tracked separately.</p><div className="p1-metric-definitions">{evaluation.metricDefinitions.map((metric, i) => <article key={metric.name}><span>0{i + 1}</span><h3>{metric.name}</h3><p>{metric.detail}</p></article>)}</div></Section>

    <Section id="evaluation" number="10" title="Measured results on the checked-in corpus"><div className="p1-results-banner"><b>{evaluation.label}</b><span>Saved evaluation artifact · not production performance</span></div><p>Values below are answerable-only macro averages from the checked-in report, over {evaluation.answerableCases} questions. They are shown to make the comparison inspectable, not to claim a general benchmark win.</p><MetricTable/><p className="p1-note">The {evaluation.unanswerableCases} unanswerable cases are scored as zero in the separately reported all-case aggregates. The small corpus has only {evaluation.corpusChunks} chunks; by K=5 every answerable method has full recall. Semantic and hybrid tie on the displayed macro metrics. These results do not establish that hybrid retrieval is generally better.</p></Section>

    <Section id="evidence" number="11" title="Tests and artifacts make the pipeline reviewable"><div className="p1-evidence-metrics"><EvidenceMetric value={`${project.evidence.testFunctions}`} label="DECLARED TEST FUNCTIONS" detail={`Across ${project.evidence.testModules} test modules; source count, not a run result`}/><EvidenceMetric value="3" label="RETRIEVAL METHODS" detail="Semantic · BM25 · Hybrid"/><EvidenceMetric value="2" label="SAVED RESULT FORMATS" detail="Aggregate JSON · per-question CSV"/></div><div className="p1-artifact-list">{project.evidence.artifacts.map(item => <article key={item.path}><span>ARTIFACT</span><h3>{item.name}</h3><code>{item.path}</code></article>)}</div><p className="p1-note">The test inventory spans API behavior, parsing, chunking, search, fusion, dataset validation, metric definitions, and reproducible experiment output. The function count is read from the source declarations and does not imply that this portfolio task ran those tests.</p></Section>

    <Section id="decisions" number="12" title="Decisions favor inspectability at small scale"><div className="p1-decision-grid">{project.decisions.map((decision, i) => <article key={decision.title}><span>0{i + 1} / TRADE-OFF</span><h3>{decision.title}</h3><p>{decision.detail}</p></article>)}</div></Section>

    <Section id="scope" number="13" title="Current scope and limits"><ul className="p1-scope-list">{project.limitations.map(item => <li key={item}>{item}</li>)}</ul></Section>

    <Section id="next-steps" number="14" title="Next engineering steps"><ol className="p1-next-steps">{project.nextSteps.map((item, i) => <li key={item}><span>0{i + 1}</span><p>{item}</p></li>)}</ol></Section>

    <Section id="links" number="15" title="Source and project links"><p>{project.sourceStatus}</p><div className="p1-link-row"><a href="/#projects">Return to selected work <span aria-hidden="true">←</span></a><span>Evaluation artifacts are identified above by repository-relative path.</span></div></Section>
  </main><footer className="p1-footer"><a href="/#projects">← Back to selected work</a><span>PROJECT 01 · ENGINEERING EVIDENCE LAB</span><a href="#p1-main">BACK TO TOP ↑</a></footer></div>;
}

export default ProjectOneCaseStudy;
