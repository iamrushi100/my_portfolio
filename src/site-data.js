import { projectOne } from './project-one-data.js';
import { projectThree } from './project-three-data.js';
import { projectFive } from './case-study-data.js';

export const projects = [
  {
    kind: 'AI ENGINEERING  /  SOFTWARE',
    title: 'Intelligent Document Retrieval & Evaluation Platform',
    description: 'Document ingestion, semantic and BM25 hybrid retrieval with Reciprocal Rank Fusion, and a reproducible evaluation harness. End-to-end RAG through POST /ask uses deterministic mock generation by default; answer quality and grounding are not evaluated.',
    status: 'Implemented / evaluation documented',
    tags: ['FastAPI', 'Semantic retrieval', 'BM25', 'RRF', 'Evaluation'],
    mark: 'R∕R',
    caseStudyPath: '/projects/project-1',
    repositoryUrl: 'https://github.com/iamrushi100/intelligent-document-retrieval',
  },
  {
    kind: 'AI  /  GENAI  /  EVALUATION',
    title: 'RAGWatch — Retrieval Quality Evaluation',
    description: 'A local-first tool that measures TF-IDF rankings against labeled questions, compares saved runs, and inspects per-question results. Retrieval-only; it does not generate or judge answers.',
    status: 'Implemented / fictional sample evaluation',
    tags: ['RAG', 'TF-IDF', 'Retrieval metrics', 'Ranking diagnostics', 'Streamlit'],
    mark: 'R∕E',
    caseStudyPath: '/projects/project-3',
    repositoryUrl: 'https://github.com/iamrushi100/RAGWatch',
    visualIndex: 1,
  },
  {
    kind: 'CYBERSECURITY  /  AI ENGINEERING',
    title: 'Vulnerability Prioritization with Evidence and Asset Context',
    description: 'Deterministic vulnerability-prioritization heuristic; NVD, CISA KEV, and FIRST EPSS clients are implemented. The demo/evaluation uses synthetic fixture values, not live-source results.',
    status: 'Local MVP / synthetic demo',
    tags: ['Vulnerability intelligence', 'Risk scoring', 'FastAPI', 'EPSS / KEV', 'Security analytics'],
    mark: 'S∕A',
    caseStudyPath: '/projects/project-5',
    repositoryUrl: 'https://github.com/iamrushi100/ai-security-vulnerability-prioritizer',
    visualIndex: 2,
  },
];

const projectOneTest = `${projectOne.evidence.documentedTestRun} · public README at 770b1f5`;
const projectThreeTest = `${projectThree.evidence.find(({ label }) => label === 'Automated tests').detail.match(/\d+ passed/)?.[0]} · documented prior repository run`;
const projectFiveTest = projectFive.artifacts.find(({ name }) => name === 'Documented prior test run').status;

export const evidence = [
  {
    label: 'Project 1 · evaluation dataset, JSON/CSV results, and test source',
    status: 'CHECKED-IN',
    detail: '',
  },
  { label: 'Project 1 · automated tests', status: 'DOCUMENTED PRIOR RUN', detail: projectOneTest },
  {
    label: 'Project 3 · sample evaluation and ranking-inversion reports',
    status: 'CHECKED-IN',
    detail: `${projectThree.metrics.reportPath} · ${projectThree.regression.reportPath}`,
  },
  { label: 'Project 3 · automated tests', status: 'DOCUMENTED PRIOR RUN', detail: projectThreeTest },
  { label: 'Project 5 · synthetic fixture evaluation', status: 'DOCUMENTED PRIOR RUN', detail: 'Results documented in Project 5 repository documentation' },
  { label: 'Project 5 · automated tests', status: 'DOCUMENTED PRIOR RUN', detail: projectFiveTest },
  { label: 'Raw test output and project screenshots', status: 'NOT CAPTURED', detail: 'Not captured for these portfolio case studies' },
];
