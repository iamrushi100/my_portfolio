import React from 'react';
import { projectFive as project } from './case-study-data.js';
import './case-study.css';

const flow = [
  ['01', 'NVD', 'Vulnerability records and applicability evidence'],
  ['02', 'Normalization', 'Validate records and preserve provenance'],
  ['03', 'CVE / vulnerability storage', 'SQLite evidence records'],
  ['04', 'CISA KEV + FIRST EPSS', 'Dated catalog and probability observations'],
  ['05', 'Asset matching', 'Normalized identity and literal version subset'],
  ['06', 'Contextual scoring', 'Available factors beside a CVSS baseline'],
  ['07', 'Prioritized findings', 'Assessment, coverage, warnings'],
  ['08', 'Human review', 'Status and analyst note history'],
];

function CaseStudyHero() {
  return <section className="p5-hero" aria-labelledby="p5-title">
    <div className="p5-hero-copy">
      <p className="p5-eyebrow"><span /> SECURITY INTELLIGENCE / CASE 05</p>
      <h1 id="p5-title">{project.title}</h1>
      <p className="p5-lede">A local decision-support workflow that brings vulnerability evidence and asset context into an inspectable analyst review queue.</p>
      <p className="p5-status"><span>STATUS</span>{project.status}</p>
      <ul className="p5-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="p5-actions">
        {project.repositoryUrl && <a className="p5-button p5-button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">View source <span aria-hidden="true">↗</span></a>}
        <a className="p5-button" href="/#projects">Return to portfolio <span aria-hidden="true">←</span></a>
      </div>
      <p className="p5-source-status">{project.sourceStatus}</p>
    </div>
    <div className="p5-hero-visual" aria-hidden="true"><div className="p5-orbit orbit-one"/><div className="p5-orbit orbit-two"/><div className="p5-visual-line line-one"/><div className="p5-visual-line line-two"/><div className="p5-visual-line line-three"/><div className="p5-visual-node node-source">CVE<br/><small>EVIDENCE</small></div><div className="p5-visual-node node-match">ASSET<br/><small>CONTEXT</small></div><div className="p5-visual-core">P<span>·</span></div><div className="p5-visual-node node-review">REVIEW<br/><small>HUMAN</small></div><p className="p5-visual-caption">EVIDENCE → REVIEW</p></div>
  </section>;
}

function ArchitectureFlow() {
  return <ol className="p5-flow" aria-label="System architecture flow">{flow.map(([number, title, detail]) => <li className="p5-flow-node" key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol>;
}

function EvidenceCard({ label, title, children, synthetic = false }) {
  return <article className="p5-evidence-card">
    <span className="p5-card-kicker">{label}</span>
    {synthetic && <span className="p5-fixture-label">SYNTHETIC / FIXTURE</span>}
    <h3>{title}</h3><div className="p5-card-copy">{children}</div>
  </article>;
}

function MetricResultCard({ value, label, detail }) {
  return <article className="p5-metric-card"><b>{value}</b><span>{label}</span>{detail && <p>{detail}</p>}</article>;
}

function DecisionBlock({ title, children }) {
  return <article className="p5-decision-block"><span>ENGINEERING DECISION</span><h3>{title}</h3><p>{children}</p></article>;
}

function ScopeBlock() {
  return <section className="p5-scope" id="scope" aria-labelledby="scope-title">
    <div className="p5-section-label"><span>08</span><i /> BOUNDARIES</div>
    <div><h2 id="scope-title">Scope &amp; next steps</h2>
      <ul><li>Evaluation uses a synthetic fixture.</li><li>The score is a heuristic, not a validated predictive model.</li><li>Candidate matching is not confirmed impact.</li><li>Production authentication and deployment are outside current scope.</li></ul>
    </div>
  </section>;
}

function Section({ id, number, title, children, className = '' }) {
  return <section className={`p5-section ${className}`} id={id} aria-labelledby={`${id}-title`}><div className="p5-section-label"><span>{number}</span><i /> PROJECT INVESTIGATION</div><div className="p5-section-body"><h2 id={`${id}-title`}>{title}</h2>{children}</div></section>;
}

function P5Header() {
  return <header className="p5-header"><a href="/#top" className="p5-brand" aria-label="Engineering Evidence Lab, home"><b>R</b>/W <span>ENGINEERING EVIDENCE LAB</span></a><nav aria-label="Case study navigation"><a href="/#projects">All work</a><a href="#architecture">Architecture</a><a href="#evaluation">Evaluation</a><a href="#scope">Scope</a></nav></header>;
}

function ProjectFiveCaseStudy() {
  const e = project.syntheticEvaluation;
  return <div className="p5-case"><a className="p5-skip" href="#p5-main">Skip to case study</a><P5Header/><main id="p5-main">
    <CaseStudyHero />
    <Section id="problem" number="01" title="Prioritization needs context"><p>A severity score alone does not show whether a vulnerability appears in an exploitation catalog, what an exploitation-likelihood estimate says, or how important a matching asset is in a particular environment.</p><p>This project explores a transparent, local decision-support workflow. It organizes evidence for a human reviewer; it does not scan systems or decide remediation.</p><div className="p5-callout"><b>Design question</b><p>How can source signals and asset context inform review order while leaving provenance, uncertainty, and human judgment visible?</p></div></Section>

    <Section id="architecture" number="02" title="A traceable evidence path"><p>Collection clients normalize provider responses. Assessments use records stored in SQLite; matching and scoring run locally, and the resulting findings support the API and dashboard. The connectors do not continuously ingest or refresh sources.</p><ArchitectureFlow/><p className="p5-note">NVD applicability structures are retained as evidence, but CPE logic and version ranges are not evaluated. The fixture contains fictional source-shaped values.</p></Section>

    <Section id="evidence" number="03" title="Evidence stays attached to each decision"><p>The system separates source facts, local asset context, computed assessment, and reviewer judgment. Synthetic records remain visibly identified as fixtures.</p><div className="p5-evidence-grid">
      <EvidenceCard label="01 / SOURCE EVIDENCE" title="Provider observations" synthetic><p>NVD vulnerability data, CISA KEV membership snapshots, and dated FIRST EPSS observations inform assessment inputs.</p><p>Fixture values are fictional, not live source observations.</p></EvidenceCard>
      <EvidenceCard label="02 / ASSET CONTEXT" title="Local inventory" synthetic><p>Asset inventory and product associations provide criticality and internet-exposure context.</p><p>The demonstrated inventory is synthetic.</p></EvidenceCard>
      <EvidenceCard label="03 / MATCHING EVIDENCE" title="Candidate, not confirmation"><p>Normalized vendor/product identity and a narrow literal-version check support candidates. Unsupported or incomplete applicability can remain unknown.</p></EvidenceCard>
      <EvidenceCard label="04 / SCORE" title="Factors, coverage, warnings"><p>The assessment keeps score, factor coverage, match status, and data-quality warnings together. Unknown or stale signals are not silently treated as zero.</p></EvidenceCard>
      <EvidenceCard label="05 / EVALUATION" title="Small offline fixture" synthetic><p>{e.vulnerabilities} fictional vulnerability records × {e.assets} assets produced {e.pairs} pairs; {e.scorablePairs} had usable scores.</p></EvidenceCard>
      <EvidenceCard label="06 / HUMAN REVIEW" title="Judgment is recorded"><p>Review events store status and note history for a CVE/asset pair. Reviews do not modify the deterministic assessment score.</p></EvidenceCard>
    </div></Section>

    <Section id="scoring" number="04" title="Contextual score beside CVSS"><p>The contextual score combines available fresh signals with project-defined weights. Missing or stale factors are omitted and the remaining weights are renormalized; coverage indicates how much configured weight was available.</p><div className="p5-score-layout"><div className="p5-formula"><span>IMPLEMENTED FORMULA</span><code>100 × Σ(available weighted contributions)<br/>÷ Σ(available weights)</code><p>Freshness rules are provisional: KEV over 7 days and EPSS score dates over 3 days are treated as stale.</p></div><div className="p5-factor-list" aria-label="Documented score factor weights">{project.factors.map(factor => <article key={factor.name}><span>{factor.name}</span><b>{factor.weight}%</b><p>{factor.normalization}</p></article>)}</div></div><div className="p5-baseline"><div><span>CONTEXTUAL HEURISTIC</span><p>Available CVSS, EPSS, KEV, asset criticality, and internet exposure contribute to a context-aware review order.</p></div><i aria-hidden="true">↔</i><div><span>CVSS-ONLY BASELINE</span><p>CVSS base score ÷ 10 × 100, returned separately. This baseline has no local asset or additional source context.</p></div></div><p className="p5-note">These are provisional project choices, not validated weights or probabilities of risk. Compare scores cautiously when factor coverage differs.</p></Section>

    <Section id="evaluation" number="05" title="Synthetic fixture evaluation" className="p5-evaluation"><div className="p5-synthetic-banner"><b>SYNTHETIC FIXTURE EVALUATION</b><span>Fictional fixture · not predictive accuracy</span></div><p>The documented offline run uses <code>{e.fixture}</code>. Both rankings contain the same four scorable CVE/asset pairs; six records crossed with six assets produced 36 pairs overall.</p><div className="p5-metrics"><MetricResultCard value={`${e.vulnerabilities} × ${e.assets}`} label="FICTIONAL RECORDS × ASSETS"/><MetricResultCard value={`${e.scorablePairs} / ${e.pairs}`} label={`PAIRS WITH USABLE SCORE (${e.scorablePercent}%)`}/><MetricResultCard value={`${e.medianSeconds}s`} label={`DOCUMENTED MEDIAN / ${e.runtimeCalls} LOCAL CALLS`}/></div><div className="p5-rankings"><article><span>CONTEXTUAL RANKING</span><ol>{e.contextualOrder.map(id => <li key={id}>{id}</li>)}</ol></article><article><span>CVSS-ONLY RANKING · SAME PAIRS</span><ol>{e.cvssOrder.map(id => <li key={id}>{id}</li>)}</ol></article></div><p className="p5-note">These documented results and timing were not rerun for this page. They describe a tiny synthetic workflow and do not establish real-world ranking quality, predictive performance, or production capacity.</p></Section>

    <Section id="review" number="06" title="The analyst remains in the loop"><p>A reviewer opens a finding, inspects its evidence, records a status and analyst note, and saves a review event. The project retains review history against the finding.</p><ol className="p5-review-flow">{[['Finding','CVE / asset candidate'],['Evidence','Sources · match · factors'],['Status','Analyst decision'],['Analyst note','Context for the decision'],['Saved review','Timestamped event history']].map(([title, detail], i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol><div className="p5-review-details"><article><b>FastAPI</b><p>Local endpoints expose health, filtered and paginated findings, finding details, and an explicit optional explanation request. The API is unauthenticated and intended for local use.</p></article><article><b>Streamlit</b><p>The dashboard presents findings, data-quality factors, evidence, and review history. Read-only UI mode can hide review writes.</p></article></div><p className="p5-note">Optional Groq explanations are explicit, bounded to evidence, and validated; they do not determine or modify deterministic scores.</p></Section>

    <Section id="decisions" number="07" title="Engineering choices preserve context"><div className="p5-decision-grid"><DecisionBlock title="Make time explicit">An <code>as_of</code> cutoff makes freshness and source selection repeatable.</DecisionBlock><DecisionBlock title="Keep missing values unknown">Unknown and stale factors remain visible instead of silently becoming zero.</DecisionBlock><DecisionBlock title="Constrain candidate matching">Only a narrow applicability subset can enable a contextual candidate score.</DecisionBlock><DecisionBlock title="Keep a baseline">CVSS-only ordering remains available beside the contextual heuristic.</DecisionBlock><DecisionBlock title="Isolate optional AI">Explanations are separate from deterministic scoring and review state.</DecisionBlock><DecisionBlock title="Separate fixture data">The local demonstration uses a dedicated synthetic SQLite database.</DecisionBlock></div></Section>

    <ScopeBlock />
    <Section id="links" number="09" title="Source and project links"><p>The source repository URL has not been verified for this portfolio. Project materials identify the documented architecture and synthetic evaluation; no live endpoint or public source link is provided.</p><div className="p5-link-row"><a href="/#projects">Return to selected work <span aria-hidden="true">←</span></a><span>{project.sourceStatus}</span></div><div className="p5-artifacts">{project.artifacts.slice(0, 5).map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.status}</p></article>)}</div></Section>
  </main><footer className="p5-footer"><a href="/#projects">← Back to selected work</a><span>PROJECT 05 · ENGINEERING EVIDENCE LAB</span><a href="#p5-main">BACK TO TOP ↑</a></footer></div>;
}

export default ProjectFiveCaseStudy;
