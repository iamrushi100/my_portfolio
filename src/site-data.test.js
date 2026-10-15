import test from 'node:test';
import assert from 'node:assert/strict';
import { evidence, projects } from './site-data.js';

test('the homepage keeps exactly the three selected projects with explicit statuses', () => {
  assert.equal(projects.length, 3);
  assert.ok(projects.every(({ title, status, description, tags }) => title && status && description && tags.length));
  assert.match(projects[0].status, /evaluation next/i);
  assert.match(projects[1].status, /status to verify/i);
  assert.match(projects[2].status, /local mvp \/ synthetic demo/i);
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
  assert.equal(projects[2].caseStudyPath, projectFive.caseStudyPath);
  assert.equal(projects[2].repositoryUrl, null);
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
