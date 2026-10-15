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

test('the evidence preview stays labeled as planned artifacts', () => {
  assert.deepEqual(evidence, ['Test reports', 'Architecture diagrams', 'Evaluation notes', 'API examples', 'Demo videos']);
});

import { projectFive } from './case-study-data.js';

test('Project 5 portfolio content uses verified score weights and synthetic evaluation labels', () => {
  assert.equal(projectFive.title, 'AI Security Intelligence & Vulnerability Prioritization Platform');
  assert.equal(projectFive.caseStudyPath, '/projects/project-5');
  assert.equal(projectFive.sourceStatus, 'Repository URL not verified or linked');
  assert.equal(projectFive.repositoryUrl, null);
  const projectFiveCard = projects.find(({ caseStudyPath }) => caseStudyPath === projectFive.caseStudyPath);
  assert.ok(projectFiveCard);
  assert.equal(projectFiveCard.repositoryUrl, null);
  assert.deepEqual(projectFive.requiredSections, ['problem', 'architecture', 'evidence', 'scoring', 'evaluation', 'review', 'decisions', 'scope']);
  assert.equal(projectFive.factors.reduce((sum, factor) => sum + factor.weight, 0), 100);
  assert.deepEqual(projectFive.factors.map(({ weight }) => weight), [40, 20, 25, 10, 5]);
  assert.equal(projectFive.syntheticEvaluation.label, 'Synthetic fixture evaluation');
  assert.equal(projectFive.syntheticEvaluation.fixture, 'demo-fixture-v1');
  assert.equal(projectFive.syntheticEvaluation.pairs, 36);
  assert.equal(projectFive.syntheticEvaluation.scorablePairs, 4);
  assert.equal(projectFive.syntheticEvaluation.medianSeconds, 0.047732);
  assert.ok(projectFive.artifacts.some(({ name, status }) => /screenshot/i.test(name) && /not captured/i.test(status)));
});

test('Project 1 has a linked case study with all required sections', () => {
  assert.equal(projects[0].caseStudyPath, '/projects/project-1');
  assert.equal(projectOne.caseStudyPath, projects[0].caseStudyPath);
  assert.equal(projectOne.repositoryUrl, null);
  assert.equal(projectOne.evaluation.resultPath, 'evaluation/results/evaluation.json');
  const page = readFileSync(new URL('./ProjectOneCaseStudy.jsx', import.meta.url), 'utf8');
  for (const section of projectOne.requiredSections) {
    assert.ok(page.includes(`id="${section}"`), `missing case-study section: ${section}`);
  }
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
  assert.deepEqual([projectOne.evidence.testFunctions, projectOne.evidence.testModules], [35, 9]);
});

test('Project 3 route, homepage card, and required case-study sections are wired', () => {
  const card = projects.find(({ caseStudyPath }) => caseStudyPath === projectThree.caseStudyPath);
  assert.ok(card);
  assert.equal(projectThree.caseStudyPath, '/projects/project-3');
  assert.equal(projectThree.repositoryUrl, null);
  const page = readFileSync(new URL('./ProjectThreeCaseStudy.jsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
  assert.ok(app.includes('"/projects/project-3"'));
  for (const section of projectThree.requiredSections) {
    assert.ok(page.includes(`id="${section}"`), `missing case-study section: ${section}`);
  }
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
    'SQLite history + dashboard', 'Continuous integration',
  ]);
  assert.equal(labels.length, 5);
  assert.match(projectThree.evidence[0].detail, /12 pytest modules/);
  assert.match(projectThree.evidence[4].detail, /Python 3\.13/);
});
