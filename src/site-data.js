import { projectOne } from './project-one-data.js';
import { projectThree } from './project-three-data.js';
import { projectFive } from './case-study-data.js';

export const projects = [
  {
    kind: 'AI ENGINEERING  /  SOFTWARE',
    shortTitle: 'DOCUMENT RETRIEVAL',
    title: 'Intelligent Document Retrieval & Evaluation Platform',
    description: 'Document ingestion, semantic and BM25 hybrid retrieval with Reciprocal Rank Fusion, and a reproducible evaluation harness. End-to-end RAG through POST /ask uses deterministic mock generation by default; answer quality and grounding are not evaluated.',
    status: 'Implemented / evaluation documented',
    tags: ['FastAPI', 'Semantic retrieval', 'BM25', 'RRF', 'Evaluation'],
    mark: 'R∕R',
    visualImage: '/screens/project1/project1-hybrid-retrieval.png',
    visualAlt: 'Project 1 interface showing hybrid retrieval results ranked from semantic and BM25 candidates.',
    caseStudyPath: '/projects/document-retrieval',
    repositoryUrl: 'https://github.com/iamrushi100/intelligent-document-retrieval',
  },
  {
    kind: 'AI  /  GENAI  /  EVALUATION',
    shortTitle: 'RAGWATCH',
    title: 'RAGWatch — Retrieval Quality Evaluation',
    description: 'A local-first tool that measures TF-IDF rankings against labeled questions, compares saved runs, and inspects per-question results. Retrieval-only; it does not generate or judge answers.',
    status: 'Implemented / fictional sample evaluation',
    tags: ['RAG', 'TF-IDF', 'Retrieval metrics', 'Ranking diagnostics', 'Streamlit'],
    mark: 'R∕E',
    caseStudyPath: '/projects/ragwatch',
    repositoryUrl: 'https://github.com/iamrushi100/RAGWatch',
    visualIndex: 1,
    visualImage: '/screens/ragwatch/ragwatch-evaluation.png',
    visualAlt: 'RAGWatch Streamlit dashboard showing the checked-in fictional evaluation report, aggregate metrics, and per-question results.',
  },
  {
    kind: 'CYBERSECURITY  /  AI ENGINEERING',
    shortTitle: 'VULNERABILITY PRIORITIZATION',
    title: 'Vulnerability Prioritization with Evidence and Asset Context',
    description: 'Deterministic vulnerability-prioritization heuristic; NVD, CISA KEV, and FIRST EPSS clients are implemented. The demo/evaluation uses synthetic fixture values, not live-source results.',
    status: 'Local MVP / synthetic demo',
    tags: ['Vulnerability intelligence', 'Risk scoring', 'FastAPI', 'EPSS / KEV', 'Security analytics'],
    mark: 'S∕A',
    caseStudyPath: '/projects/vuln-prioritization',
    repositoryUrl: 'https://github.com/iamrushi100/ai-security-vulnerability-prioritizer',
    visualIndex: 2,
    visualImage: '/screens/project5/riskpriority-overview.png',
    visualAlt: 'RISKPRIORITY synthetic demo dashboard with security snapshot counts, priority intelligence and contextual priority score.',
  },
];

const projectOneTest = `${projectOne.evidence.documentedTestRun} · public README at 770b1f5`;
const projectThreeTest = `${projectThree.evidence.find(({ label }) => label.startsWith('Continuous integration')).detail.match(/\d+ passed/)?.[0]} · Actions run 38068546601 · commit 18a1935 (2026-10-10)`;
const projectFiveTest = projectFive.artifacts.find(({ name }) => name === 'Documented prior test run').status;

export const evidence = [
  { label: 'Document Retrieval · evaluation dataset', status: 'CHECKED-IN', detail: 'evaluation/dataset.json', url: 'https://github.com/iamrushi100/intelligent-document-retrieval/blob/main/evaluation/dataset.json' },
  { label: 'Document Retrieval · aggregate results', status: 'CHECKED-IN', detail: 'evaluation/results/evaluation.json', url: 'https://github.com/iamrushi100/intelligent-document-retrieval/blob/main/evaluation/results/evaluation.json' },
  { label: 'Document Retrieval · per-question results', status: 'CHECKED-IN', detail: 'evaluation/results/per_question.csv', url: 'https://github.com/iamrushi100/intelligent-document-retrieval/blob/main/evaluation/results/per_question.csv' },
  { label: 'Document Retrieval · test source', status: 'CHECKED-IN', detail: 'tests/', url: 'https://github.com/iamrushi100/intelligent-document-retrieval/tree/main/tests' },
  { label: 'Project 1 · automated tests', status: 'DOCUMENTED PRIOR RUN', detail: projectOneTest },
  { label: 'Project 1 · product, evaluation, and API screenshots', status: 'CHECKED-IN', detail: 'Visual evidence available in the Project 1 case study' },
  { label: 'RAGWatch · sample evaluation report', status: 'CHECKED-IN', detail: projectThree.metrics.reportPath, url: 'https://github.com/iamrushi100/RAGWatch/blob/main/reports/demo-evaluation-final.json' },
  { label: 'RAGWatch · ranking-inversion report', status: 'CHECKED-IN', detail: projectThree.regression.reportPath, url: 'https://github.com/iamrushi100/RAGWatch/blob/main/reports/retrieval-regression-experiment.json' },
  { label: 'Project 3 · automated tests', status: 'VERIFIED CI RUN', detail: projectThreeTest },
  { label: 'Project 3 · RAGWatch dashboard and metrics screenshots', status: 'CHECKED-IN', detail: 'Captured from the running Streamlit app using its saved fixture report' },
  { label: 'RAGWatch · GitHub Actions', status: 'VERIFIED CI RUN', detail: 'Successful repository workflow run verified during P1 audit' },
  { label: 'Vulnerability Prioritization · synthetic demo data', status: 'CHECKED-IN', detail: 'docs/demo-data.md · fixture scope and fictional provenance', url: 'https://github.com/iamrushi100/ai-security-vulnerability-prioritizer/blob/main/docs/demo-data.md' },
  { label: 'Vulnerability Prioritization · documented fixture evaluation', status: 'DOCUMENTED PRIOR RUN', detail: '36 CVE/asset pairs; 4 pairs with usable contextual and CVSS-only scores', url: 'https://github.com/iamrushi100/ai-security-vulnerability-prioritizer/blob/main/docs/testing-and-evaluation.md' },
  { label: 'Vulnerability Prioritization · automated tests', status: 'DOCUMENTED PRIOR RUN', detail: projectFiveTest },
  { label: 'Project 5 · synthetic fixture evaluation', status: 'DOCUMENTED PRIOR RUN', detail: 'Results documented in Project 5 repository documentation' },
  { label: 'Project 5 · automated tests', status: 'DOCUMENTED PRIOR RUN', detail: projectFiveTest },
  { label: 'Project 5 · RISKPRIORITY product screenshots', status: 'CHECKED-IN', detail: 'Authentic screenshots of the local synthetic demo dashboard and evidence views' },
  { label: 'Project test output for current source HEAD', status: 'NOT CAPTURED', detail: 'Current raw test output has not been attached to the portfolio evidence ledger' },
];
