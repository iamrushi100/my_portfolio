export const projectFive = {
  title: 'AI Security Intelligence & Vulnerability Prioritization Platform',
  stack: ['Python', 'FastAPI', 'Streamlit', 'SQLite'],
  factors: [
    { name: 'CVSS base score', weight: 40, normalization: 'score / 10' },
    { name: 'FIRST EPSS probability', weight: 20, normalization: 'probability from 0 to 1' },
    { name: 'CISA KEV membership', weight: 25, normalization: 'listed = 1; eligible not-listed = 0' },
    { name: 'Asset criticality', weight: 10, normalization: '(criticality - 1) / 4' },
    { name: 'Internet exposure', weight: 5, normalization: 'internet-facing = 1; internal = 0' },
  ],
  syntheticEvaluation: {
    fixture: 'demo-fixture-v1', vulnerabilities: 6, assets: 6, pairs: 36,
    scorablePairs: 4, scorablePercent: 11.11, medianSeconds: 0.047732, runtimeCalls: 7,
    contextualOrder: ['CVE-2099-0002', 'CVE-2099-0003', 'CVE-2099-0001', 'CVE-2099-0004'],
    cvssOrder: ['CVE-2099-0001', 'CVE-2099-0002', 'CVE-2099-0003', 'CVE-2099-0004'],
  },
  artifacts: [
    { name: 'Architecture diagram', status: 'Available in this case study' },
    { name: 'Documented synthetic evaluation', status: 'Available in Project 5 docs' },
    { name: 'API examples', status: 'Documented; no live endpoint' },
    { name: 'Test run output', status: 'Not captured for this case study' },
    { name: 'Dashboard screenshot or recording', status: 'Not captured' },
    { name: 'Public source repository link', status: 'Not verified or linked' },
  ],
};
