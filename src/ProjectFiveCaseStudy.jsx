import React from 'react';
import { projectFive as project } from './case-study-data.js';
import './case-study.css';

const flow = [
  ['01', 'Source connectors', 'NVD CVEs · CISA KEV snapshots · FIRST EPSS observations'],
  ['02', 'Normalize + validate', 'Source-specific schemas · timestamps · provenance'],
  ['03', 'SQLite evidence records', 'CVE facts · NVD applicability · KEV snapshots · EPSS history'],
  ['04', 'Synthetic asset inventory', 'Criticality · exposure · product associations'],
  ['05', 'Candidate matching', 'Exact normalized identity · supported version evidence'],
  ['06', 'Contextual scoring', 'Available factors beside a CVSS baseline'],
  ['07', 'Prioritized findings', 'Assessment, coverage, warnings'],
  ['08', 'Human review', 'Status and analyst note history'],
];

function CaseStudyHero() {
  return <section className="p5-hero" aria-labelledby="p5-title">
    <div className="p5-hero-copy">
      <p className="p5-eyebrow"><span /> SECURITY INTELLIGENCE / CASE 05</p>
      <h1 id="p5-title">{project.title}</h1>
      <p className="p5-lede">{project.description}</p>
      <p className="p5-source-status">{project.supportingCapability}</p>
      <p className="p5-status"><span>STATUS</span>{project.status}</p>
      <ul className="p5-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="p5-actions">
        {project.repositoryUrl && <a className="p5-button p5-button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">View GitHub repository <span aria-hidden="true">↗</span></a>}
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
    <div><h2 id="scope-title">Scope &amp; limitations</h2>
      <ul>{project.limitations.map(item => <li key={item}>{item}</li>)}</ul>
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
    <Section id="problem" number="01" title="Prioritization needs context"><p>{project.problem}</p><p>The system organizes evidence for a human reviewer. It does not scan systems, execute exploits, or decide remediation.</p><div className="p5-callout"><b>SYNTHETIC RESULT SUMMARY</b><p>{project.syntheticEvaluation.pairs} vulnerability–asset pairs · {project.syntheticEvaluation.scorablePairs} comparable pairs · {project.syntheticEvaluation.scorablePercent}% contextual-score coverage. Formula behavior on fictional fixture data only.</p></div></Section>

    <Section id="architecture" number="02" title="A traceable evidence path"><p>Source connectors are separate from normalization and persistence. Assessments read stored records, match candidate products, and calculate a deterministic score locally; FastAPI and Streamlit expose findings and review state. Fetching is explicit, not continuous. {project.storage}</p><ArchitectureFlow/><p className="p5-note">NVD, CISA KEV, and FIRST EPSS fetch clients are implemented. The displayed demo and evaluation use fictional fixture values; they were not produced by live external-source fetches. Stored NVD applicability is limited to the matching rules described below.</p></Section>

    <Section id="evidence" number="03" title="Keep source facts, assumptions, and decisions distinct"><p>Each signal answers a different question and has its own record and provenance. This separation makes missing data and synthetic assumptions visible instead of blending them into one vulnerability record.</p><div className="p5-evidence-grid">
      {project.sources.map((source, index) => <EvidenceCard key={source.label} label={`0${index + 1} / SOURCE ROLE`} title={source.label}><p>{source.detail}</p></EvidenceCard>)}
      <EvidenceCard label="04 / NORMALIZATION + STORAGE" title="Validated, separately persisted"><p>{project.storage}</p><p>NVD keeps source and collection timestamps; EPSS keeps score date distinct from retrieval time; KEV membership remains tied to a successful catalog snapshot.</p></EvidenceCard>
      <EvidenceCard label="05 / ASSET CONTEXT" title="Six fictional systems" synthetic><p>{project.assetContext}</p></EvidenceCard>
      <EvidenceCard label="06 / MATCHING" title="A candidate is not impact">{project.matching.map(item => <p key={item}>{item}</p>)}</EvidenceCard>
      <EvidenceCard label="07 / VALIDATION" title="Input and evidence validation">{project.validationEvidence.map(item => <p key={item}>{item}</p>)}</EvidenceCard>
      <EvidenceCard label="08 / ASSESSMENT + REVIEW" title="Inspectable factors and human status"><p>Assessment output retains per-factor values, weights, contributions, source timestamps, missing/stale reasons, match status, and coverage. Reviewer status and note events are stored against the CVE/asset pair and do not alter its score.</p></EvidenceCard>
    </div></Section>

    <Section id="scoring" number="04" title="A weighted heuristic, not a trained model"><p>{project.scoringExplanation}</p><div className="p5-score-layout"><div className="p5-formula"><span>IMPLEMENTED FORMULA</span><code>100 × Σ(available weighted contributions)<br/>÷ Σ(available weights)</code><p>{project.freshness}</p></div><div className="p5-factor-list" aria-label="Documented score factor weights">{project.factors.map(factor => <article key={factor.name}><span>{factor.name}</span><b>{factor.weight}%</b><p>{factor.normalization}</p></article>)}</div></div><div className="p5-baseline"><div><span>CONTEXTUAL HEURISTIC</span><p>Fresh available CVSS, EPSS, KEV, asset criticality, and internet exposure contribute to the normalized score.</p></div><i aria-hidden="true">↔</i><div><span>CVSS-ONLY BASELINE</span><p>CVSS base score ÷ 10 × 100, returned separately. It has no asset, KEV, or EPSS context.</p></div></div><p className="p5-note">The weights and freshness windows are provisional project choices, not validated weights or probabilities of risk. Scores with different coverage are less directly comparable.</p></Section>

    <Section id="evaluation" number="05" title="Synthetic fixture evaluation" className="p5-evaluation"><div className="p5-synthetic-banner"><b>SYNTHETIC FIXTURE EVALUATION</b><span>Fictional fixture · not predictive accuracy</span></div><p>The documented offline run uses <code>{e.fixture}</code>. Six vulnerability records crossed with six fictional assets to produce 36 vulnerability–asset pairs; four had usable contextual scores and a CVSS-only baseline, so only those four enter the like-for-like comparison.</p><div className="p5-metrics"><MetricResultCard value={`${e.vulnerabilities} × ${e.assets}`} label="FICTIONAL RECORDS × ASSETS"/><MetricResultCard value={`${e.scorablePairs} / ${e.pairs}`} label={`USABLE CONTEXTUAL SCORES · ${e.scorablePercent}%`}/><MetricResultCard value={`${e.medianSeconds.toFixed(4)}s median`} label={`LOCAL MICRO-WORKLOAD · ${e.runtimeCalls} ASSESSMENT RUNS`} detail={`${e.medianSeconds.toFixed(4)}s median — local micro-workload, ${e.runtimeCalls} assessment runs.`}/></div><p className="p5-note">This 0.0477s median is a local micro-workload timing, not a capacity or production benchmark. It is a documented prior result, not a current run.</p><p className="p5-note">Provenance: as_of {e.asOf} · evaluation report {e.reportTimestamp}. Coverage: {e.pairs} total pairs; {e.scorablePairs}/{e.pairs} ({e.scorablePercent}%) with usable contextual scores; {e.unknownApplicabilityPairs}/{e.pairs} with unknown applicability; {e.staleFactorPairs}/{e.pairs} with at least one stale factor. Only the four comparable pairs enter the contextual-vs-CVSS comparison.</p><div className="p5-rankings"><article><span>CONTEXTUAL ORDER · BOTH SCORES / COVERAGE</span><ol>{e.rankingComparison.map(row => <li key={row.cve}>{row.cve.replace('CVE-', '')} / {row.asset} · contextual {row.contextual} · CVSS-only {row.cvssBaseline} · coverage {row.coverage}%</li>)}</ol></article><article><span>CVSS-ONLY ORDER · BOTH SCORES / COVERAGE</span><ol>{e.cvssOrder.map(id => { const row = e.rankingComparison.find(item => item.cve === id); return <li key={id}>{id.replace('CVE-', '')} / {row.asset} · contextual {row.contextual} · CVSS-only {row.cvssBaseline} · coverage {row.coverage}%</li>; })}</ol></article></div><p className="p5-note">The contextual order is 0002, 0003, 0001, 0004; the CVSS-only order is 0001, 0002, 0003, 0004. {e.caveat}</p></Section>

    <Section id="review" number="06" title="The analyst remains in the loop"><p>A reviewer opens a finding, inspects its evidence, records a status and analyst note, and saves a review event. The project retains review history against the finding.</p><ol className="p5-review-flow">{[['Finding','CVE / asset candidate'],['Evidence','Sources · match · factors'],['Status','Analyst decision'],['Analyst note','Context for the decision'],['Saved review','Timestamped event history']].map(([title, detail], i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol><div className="p5-review-details"><article><b>FastAPI</b><p>Local endpoints expose health, filtered and paginated findings, finding details, and an explicit optional explanation request. The API is unauthenticated and intended for local use.</p></article><article><b>Streamlit</b><p>The dashboard presents findings, data-quality factors, evidence, and review history. Read-only demo mode hides the review form; it is not an authorization or security boundary.</p></article></div><p className="p5-note">Optional Groq explanations are explicit, bounded to evidence, and validated; they do not determine or modify deterministic scores.</p></Section>

    <Section id="decisions" number="07" title="Engineering choices preserve context"><div className="p5-decision-grid">{project.decisions.map(decision => <DecisionBlock key={decision.title} title={decision.title}>{decision.detail}</DecisionBlock>)}</div></Section>

    <ScopeBlock />
    <Section id="next-steps" number="09" title="Next engineering steps"><ol className="p5-review-flow">{project.nextSteps.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol><p className="p5-note">The documented ML feasibility review defers training: the available data lacks authentic historical source snapshots and labels for a leakage-aware time split.</p></Section>
    <Section id="links" number="10" title="Source & artifacts"><p>The public source repository is linked below. Project materials identify the documented architecture and synthetic evaluation; no live endpoint is provided. Evaluation artifacts are identified by repository-relative path where available.</p><div className="p5-link-row">{project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Open GitHub repository <span aria-hidden="true">↗</span></a>}<a href="/#projects">Return to selected work <span aria-hidden="true">←</span></a><span>{project.sourceStatus}</span></div><div className="p5-artifacts">{project.artifacts.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.status}</p></article>)}</div></Section>
  </main><footer className="p5-footer"><a href="/#projects">← Back to selected work</a><span>PROJECT 05 · ENGINEERING EVIDENCE LAB</span><a href="#p5-main">BACK TO TOP ↑</a></footer></div>;
}

export default ProjectFiveCaseStudy;
