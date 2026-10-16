import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evidence, projects } from './site-data.js';
import { projectOne } from './project-one-data.js';
import { projectThree } from './project-three-data.js';

test('the homepage keeps the selected projects with explicit statuses', () => {
  assert.equal(projects.length, 3);
  for (const project of projects) {
    assert.equal(typeof project.status, 'string');
    assert.ok(project.status.trim().length > 0);
  }
});

test('homepage evidence rows use project-supported states instead of universal availability', () => {
  const supportedStatuses = new Set(['CHECKED-IN', 'DOCUMENTED PRIOR RUN', 'NOT CAPTURED']);
  assert.ok(evidence.length > 0);
  assert.ok(evidence.every(({ status }) => supportedStatuses.has(status)));
  assert.ok(evidence.some(({ status }) => status === 'CHECKED-IN'));
  assert.ok(evidence.some(({ status }) => status === 'DOCUMENTED PRIOR RUN'));
  assert.ok(evidence.some(({ status }) => status === 'NOT CAPTURED'));
  assert.ok(evidence.every(({ status }) => status !== 'AVAILABLE'));
  assert.ok(evidence.find(({ label }) => label.includes('Project 1 · automated tests')).detail.includes('62 passed'));
  assert.ok(evidence.find(({ label }) => label.includes('Project 3 · automated tests')).detail.includes('174 passed'));
  assert.ok(evidence.find(({ label }) => label.includes('Project 5 · automated tests')).detail.includes('133 passed'));
});

test('homepage hero states the AI engineering direction without inflated credentials', () => {
  const page = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
  assert.match(page, /AI ENGINEERING · AI\/ML · SOFTWARE · CYBERSECURITY/);
  assert.match(page, /AI engineering<br\/>for retrieval,/);
  assert.match(page, /with cybersecurity work shown through vulnerability prioritization/i);
  assert.doesNotMatch(page, /AI expert|cybersecurity expert|production experience|enterprise experience/i);
});

test('homepage project cards qualify the implemented RAG flow and synthetic Project 5 fixture', () => {
  const p1 = projects.find(({ caseStudyPath }) => caseStudyPath === '/projects/project-1');
  assert.match(p1.description, /end-to-end RAG through POST \/ask/i);
  assert.match(p1.description, /hybrid retrieval/i);
  assert.match(p1.description, /deterministic mock generation by default/i);
  assert.match(p1.description, /answer quality and grounding are not evaluated/i);

  const p5 = projects.find(({ caseStudyPath }) => caseStudyPath === '/projects/project-5');
  assert.match(p5.description, /deterministic vulnerability-prioritization heuristic/i);
  assert.match(p5.description, /NVD, CISA KEV, and FIRST EPSS clients are implemented/i);
  assert.match(p5.description, /synthetic fixture values, not live-source results/i);
  assert.doesNotMatch(p5.description, /ML-based prioritization|AI prioritization|live-source evaluation/i);
});

test('Project 3 has a distinct evaluation visual and verified source wording stays separate from the portfolio', () => {
  const p1Visual = projects.find(({ caseStudyPath }) => caseStudyPath === '/projects/project-1').visualIndex ?? 0;
  const p3 = projects.find(({ caseStudyPath }) => caseStudyPath === '/projects/project-3');
  assert.notEqual(p3.visualIndex, p1Visual);
  assert.equal(p3.visualIndex, 1);

  const main = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
  assert.match(main, /EVALUATION \/ COMPARISON/);
  assert.match(main, /TF-IDF/);
  assert.match(main, /DELTA/);
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  assert.match(readme, /verified public project repositories/i);
  assert.match(readme, /separate from this portfolio website/i);
  assert.match(readme, /do not imply that local portfolio edits.*have been published/i);
  assert.doesNotMatch(readme, /public source link remain unavailable|Repository links.*omitted until verified/i);
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /Engineering Evidence Lab \| AI Engineering & Cybersecurity/);
});

import { projectFive } from './case-study-data.js';

test('Project 5 portfolio content uses verified score weights and synthetic evaluation labels', () => {
  assert.equal(projectFive.title, 'Vulnerability Prioritization with Evidence and Asset Context');
  assert.equal(projectFive.caseStudyPath, '/projects/project-5');
  assert.equal(projectFive.sourceStatus, 'Public GitHub repository');
  assert.equal(projectFive.repositoryUrl, 'https://github.com/iamrushi100/ai-security-vulnerability-prioritizer');
  const projectFiveCard = projects.find(({ caseStudyPath }) => caseStudyPath === projectFive.caseStudyPath);
  assert.ok(projectFiveCard);
  assert.equal(projectFiveCard.repositoryUrl, projectFive.repositoryUrl);
  assert.deepEqual(projectFive.requiredSections, ['problem', 'architecture', 'evidence', 'scoring', 'evaluation', 'review', 'decisions', 'scope', 'next-steps', 'links']);
  assert.equal(projectFive.factors.reduce((sum, factor) => sum + factor.weight, 0), 100);
  assert.deepEqual(projectFive.factors.map(({ weight }) => weight), [40, 20, 25, 10, 5]);
  assert.deepEqual(projectFive.factors.map(({ normalization }) => normalization), [
    'score / 10', 'probability from 0 to 1', 'listed = 1; eligible not-listed = 0',
    '(criticality - 1) / 4', 'internet-facing = 1; internal = 0',
  ]);
  assert.deepEqual(projectFive.sources.map(({ label }) => label), [
    'NVD · vulnerability facts', 'CISA KEV · known-exploitation evidence',
    'FIRST EPSS · exploitation-likelihood estimate',
  ]);
  assert.match(projectFive.matching.join(' '), /NVD applicability is preferred/i);
  assert.match(projectFive.matching.join(' '), /KEV vendor\/product name matching is a fallback only/i);
  assert.match(projectFive.matching.join(' '), /ranges and CPE conditions are retained but not evaluated/i);
  assert.match(projectFive.scoringExplanation, /not a trained ML model/i);
  assert.match(projectFive.validationEvidence.join(' '), /CVE syntax/i);
  assert.match(projectFive.validationEvidence.join(' '), /finite and within 0–10/i);
  assert.match(projectFive.validationEvidence.join(' '), /UTC-aware timestamps/i);
  assert.ok(projectFive.limitations.some((item) => /weights.*provisional/i.test(item)));
  assert.ok(projectFive.limitations.some((item) => /No ML model was trained/i.test(item)));
  assert.ok(projectFive.nextSteps.some((item) => /authentic, timestamped KEV, EPSS, and NVD snapshots/i.test(item)));
  assert.equal(projectFive.syntheticEvaluation.label, 'Synthetic fixture evaluation');
  assert.equal(projectFive.syntheticEvaluation.fixture, 'demo-fixture-v1');
  assert.equal(projectFive.syntheticEvaluation.pairs, 36);
  assert.equal(projectFive.syntheticEvaluation.scorablePairs, 4);
  assert.equal(projectFive.syntheticEvaluation.medianSeconds, 0.047732);
  assert.equal(projectFive.syntheticEvaluation.runtimeCalls, 7);
  assert.equal(projectFive.syntheticEvaluation.asOf, '2026-10-11T12:00:00Z');
  assert.equal(projectFive.syntheticEvaluation.reportTimestamp, '2026-10-11T18:04:22.840711Z');
  assert.equal(projectFive.syntheticEvaluation.unknownApplicabilityPairs, 7);
  assert.equal(projectFive.syntheticEvaluation.staleFactorPairs, 6);
  assert.match(projectFive.description, /deterministic weighted heuristic/i);
  assert.match(projectFive.supportingCapability, /optional Groq.*separately.*no ML model/i);
  assert.match(projectFive.assetContext, /fictional assets.*candidate\/context relationships.*do not confirm real infrastructure/i);
  assert.match(projectFive.syntheticEvaluation.caveat, /does not establish ranking quality, predictive accuracy, security outcomes, or real-world effectiveness/i);
  assert.ok(projectFive.artifacts.some(({ name, status }) => /screenshot/i.test(name) && /not captured/i.test(status)));
  assert.ok(projectFive.artifacts.some(({ name, status }) => /test run output/i.test(name) && /not captured/i.test(status)));
  assert.ok(projectFive.artifacts.some(({ name, status }) => /documented prior test run/i.test(name) && /133 passed.*not captured/i.test(status)));
  assert.ok(projectFive.artifacts.some(({ name, status }) => /public source repository/i.test(name) && /verified and linked/i.test(status)));
  const projectFivePage = readFileSync(new URL('./ProjectFiveCaseStudy.jsx', import.meta.url), 'utf8');
  assert.match(projectFivePage, /NVD, CISA KEV, and FIRST EPSS fetch clients are implemented/i);
  assert.match(projectFivePage, /not produced by live external-source fetches/i);
  assert.match(projectFivePage, /Input and evidence validation/);
  assert.match(projectFivePage, /not an authorization or security boundary/i);
  assert.ok(projectFivePage.includes('CVSS-only {row.cvssBaseline} · coverage {row.coverage}%'));
  assert.match(projectFivePage, /local micro-workload, \$\{e\.runtimeCalls\} assessment runs/i);
  assert.match(projectFivePage, /not a capacity or production benchmark/i);
  assert.match(projectFivePage, /SYNTHETIC RESULT SUMMARY/);
  assert.match(projectFivePage, /title="Next engineering steps"/);
  assert.match(projectFivePage, /title="Source & artifacts"/);
  for (const section of projectFive.requiredSections) {
    assert.ok(projectFivePage.includes(`id="${section}"`), `missing Project 5 section: ${section}`);
  }
});

test('Project 1 has a linked case study with all required sections', () => {
  assert.equal(projects[0].caseStudyPath, '/projects/project-1');
  assert.equal(projectOne.caseStudyPath, projects[0].caseStudyPath);
  assert.equal(projectOne.repositoryUrl, 'https://github.com/iamrushi100/intelligent-document-retrieval');
  assert.match(projectOne.sourceStatus, /published RAG milestone 770b1f5/i);
  assert.doesNotMatch(projectOne.sourceStatus, /one commit behind|not published/i);
  assert.equal(projectOne.evaluation.resultPath, 'evaluation/results/evaluation.json');
  const page = readFileSync(new URL('./ProjectOneCaseStudy.jsx', import.meta.url), 'utf8');
  for (const section of projectOne.requiredSections) {
    assert.ok(page.includes(`id="${section}"`), `missing case-study section: ${section}`);
  }
  assert.ok(page.includes('CaseStudySection'));
  assert.match(page, /FIXTURE RESULT/);
  assert.match(page, /DOCUMENTED PRIOR RUN/);
  assert.match(page, /title="Scope & limitations"/);
  assert.match(page, /title="Source & artifacts"/);
  const layout = readFileSync(new URL('./CaseStudyLayout.jsx', import.meta.url), 'utf8');
  assert.ok(layout.includes("'./case-study-layout.css'"));
  assert.deepEqual(projectOne.architecture.ingestion.map(({ title }) => title), [
    'Document upload', 'Validate + parse', 'Normalize', 'Chunk', 'Prepare + persist indexes',
  ]);
  assert.equal(projectOne.architecture.indexes.length, 2);
  assert.equal(projectOne.architecture.fusion.title, 'Hybrid retrieval');
  assert.equal(projectOne.architecture.output.title, 'Ranked results');
  assert.equal(projectOne.architecture.evaluation.title, 'Evaluation');
  assert.ok(projectOne.requiredSections.includes('rag-generation'));
});

test('Project 1 evaluation values and evidence counts match the checked-in report', () => {
  const { evaluation } = projectOne;
  assert.deepEqual([evaluation.cases, evaluation.answerableCases, evaluation.unanswerableCases], [30, 26, 4]);
  assert.deepEqual([evaluation.corpusDocuments, evaluation.corpusChunks], [8, 8]);
  assert.deepEqual(evaluation.ks, [1, 3, 5]);
  assert.equal(evaluation.rrfConstant, 60);
  assert.deepEqual(evaluation.aggregates.map(({ key }) => key), ['semantic', 'bm25', 'hybrid']);
  assert.deepEqual(evaluation.aggregates.map(({ values }) => values.map(({ recall, precision, mrr }) => [recall, precision, mrr])), [
    [[1, 1, 1], [1, 0.3333, 1], [1, 0.2, 1]],
    [[0.9615, 0.9615, 0.9615], [1, 0.3333, 0.9808], [1, 0.2, 0.9808]],
    [[1, 1, 1], [1, 0.3333, 1], [1, 0.2, 1]],
  ]);
  assert.deepEqual([projectOne.evidence.documentedTestRun, projectOne.evidence.testModules], ['62 passed', 11]);
  assert.match(projectOne.evidence.testStatus, /public README.*770b1f5/i);
  assert.match(projectOne.evidence.testStatus, /documented prior run/i);
  assert.ok(projectOne.evidence.artifacts.every(({ status }) => typeof status === 'string' && status.length > 0));
  assert.ok(projectOne.evidence.artifacts.some(({ name, status }) => /test output/i.test(name) && /not captured/i.test(status)));
  assert.ok(projectOne.evidence.artifacts.some(({ name, status }) => /dashboard screenshot/i.test(name) && /not captured/i.test(status)));
  assert.match(projectOne.evaluation.interpretation, /no measured advantage for hybrid over semantic/i);
  assert.ok(projectOne.decisions.some(({ title }) => /separately from generation/i.test(title)));
});

test('Project 1 implementation details and future work remain evidence-labeled', () => {
  assert.equal(projectOne.repositoryUrl, 'https://github.com/iamrushi100/intelligent-document-retrieval');
  assert.equal(projectOne.ingestion.maxUploadBytes, 10 * 1024 * 1024);
  assert.equal(projectOne.chunking.sizeCharacters, 1000);
  assert.equal(projectOne.chunking.overlapCharacters, 150);
  assert.equal(projectOne.semantic.dimensions, 384);
  assert.equal(projectOne.semantic.model, 'sentence-transformers/all-MiniLM-L6-v2');
  assert.match(projectOne.hybrid.behavior, /one-based rank/i);
  assert.match(projectOne.evaluation.label, /authored fixture/i);
  assert.match(projectOne.evaluation.caveat, /not a representative benchmark/i);
  assert.ok(projectOne.evidence.testCoverage.length >= 4);
  assert.ok(projectOne.nextSteps.some((step) => /SQLite-backed run history/i.test(step)));
  assert.ok(projectOne.nextSteps.some((step) => /metric-pipeline checks separate/i.test(step)));
});

test('Project 1 documents the implemented RAG path without claiming answer quality', () => {
  const { generation } = projectOne;
  assert.equal(generation.endpoint, 'POST /ask');
  assert.match(generation.context, /filename, document ID, chunk ID, retrieval score/i);
  assert.match(generation.mock, /deterministic mock/i);
  assert.match(generation.openai, /optional OpenAI Responses API/i);
  assert.match(generation.openai, /Live OpenAI behavior is not validated/i);
  assert.match(generation.empty, /does not call the generator/i);
  assert.match(generation.failure, /generic HTTP 502/i);
  assert.match(generation.caveat, /not a guarantee/i);
  assert.match(generation.caveat, /does not score generated answers/i);
  const page = readFileSync(new URL('./ProjectOneCaseStudy.jsx', import.meta.url), 'utf8');
  assert.match(page, /id="rag-generation"/);
  assert.match(page, /source-labeled context/i);
  assert.match(page, /DOCUMENTED PRIOR RUN/);
  assert.doesNotMatch(page, /DECLARED TEST FUNCTIONS|one commit behind/i);
});

test('Project 3 route, homepage card, and required case-study sections are wired', () => {
  const card = projects.find(({ caseStudyPath }) => caseStudyPath === projectThree.caseStudyPath);
  assert.ok(card);
  assert.equal(projectThree.caseStudyPath, '/projects/project-3');
  assert.equal(projectThree.repositoryUrl, 'https://github.com/iamrushi100/RAGWatch');
  assert.match(projectThree.overviewSummary, /TF-IDF baseline.*fictional fixture.*controlled\/artificial experiment/i);
  const page = readFileSync(new URL('./ProjectThreeCaseStudy.jsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
  assert.ok(app.includes('"/projects/project-3"'));
  for (const section of projectThree.requiredSections) {
    assert.ok(page.includes(`id="${section}"`), `missing case-study section: ${section}`);
  }
});

test('all project case studies expose the verified GitHub repository URLs', () => {
  const expected = new Map([
    ['project-1', 'https://github.com/iamrushi100/intelligent-document-retrieval'],
    ['project-3', 'https://github.com/iamrushi100/RAGWatch'],
    ['project-5', 'https://github.com/iamrushi100/ai-security-vulnerability-prioritizer'],
  ]);
  const data = [projectOne, projectThree, projectFive];
  for (const project of data) {
    assert.equal(project.repositoryUrl, expected.get(project.id));
    const card = projects.find(({ caseStudyPath }) => caseStudyPath === project.caseStudyPath);
    assert.equal(card?.repositoryUrl, project.repositoryUrl);
  }
  const caseStudies = [
    ['ProjectOneCaseStudy.jsx', 'p1-button-primary'],
    ['ProjectThreeCaseStudy.jsx', 'p3-button-primary'],
    ['ProjectFiveCaseStudy.jsx', 'p5-button-primary'],
  ];
  for (const [filename, actionClass] of caseStudies) {
    const page = readFileSync(new URL(`./${filename}`, import.meta.url), 'utf8');
    assert.ok(page.includes(actionClass), `${filename} should render an actionable source link`);
    assert.ok(page.includes('View GitHub repository'));
  }
  assert.match(projectThree.metrics.label, /SYNTHETIC \/ FICTIONAL/i);
  assert.match(projectThree.regression.label, /FICTIONAL FIXTURE/i);
  assert.match(projectFive.syntheticEvaluation.label, /synthetic fixture/i);
  assert.match(projectOne.evaluation.label, /authored fixture/i);
});

test('Project 3 uses verified sample metrics and inversion results with explicit fixture labels', () => {
  const { dataset, metrics, regression } = projectThree;
  assert.deepEqual([dataset.schemaVersion, dataset.sourceDocuments, dataset.derivedChunks, dataset.questions], [2, 7, 12, 6]);
  assert.equal(dataset.fictional, true);
  assert.equal(metrics.label, 'SYNTHETIC / FICTIONAL SAMPLE · TF-IDF BASELINE · k = 2');
  assert.deepEqual([metrics.recallAtK, metrics.mrr, metrics.ndcgAtK], [1, 0.8333333333333334, 0.8769765845238192]);
  assert.deepEqual(regression.metrics.map(({ baseline, degraded, difference }) => [baseline, degraded, difference]), [
    [1, 0, -1],
    [0.8333333333333334, 0.08712121212121211, -0.7462121212121212],
    [0.8769765845238192, 0, -0.8769765845238192],
  ]);
  assert.match(regression.label, /FICTIONAL FIXTURE/i);
  assert.match(regression.caveat, /not a real-world regression benchmark/i);
});

test('Project 3 evidence labels describe reports, tests, dashboard/history, and CI', () => {
  const labels = projectThree.evidence.map(({ label }) => label);
  assert.deepEqual(labels, [
    'Automated tests', 'Evaluation reports', 'Controlled regression report',
    'SQLite history + dashboard', 'Continuous integration', 'Test output',
  ]);
  assert.equal(labels.length, 6);
  assert.match(projectThree.evidence[0].detail, /12 pytest modules/);
  assert.match(projectThree.evidence[0].detail, /174 passed.*no current test run is claimed/i);
  assert.match(projectThree.evidence[1].detail, /Checked-in JSON/);
  assert.match(projectThree.evidence[4].detail, /Python 3\.13/);
  assert.match(projectThree.evidence[4].detail, /current remote CI status is not verified/i);
  const page = readFileSync(new URL('./ProjectThreeCaseStudy.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /this case-study change/i);
  assert.match(page, /prior local run of 174 passing tests/i);
  assert.match(page, /title="Scope & limitations"/);
  assert.match(page, /title="Source & artifacts"/);
});
