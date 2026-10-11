export const users = [
  {
    id: 'u-001',
    email: 'admin@threatverse.io',
    name: 'Admin User',
    role: 'admin',
    avatar: 'A',
  },
  {
    id: 'u-002',
    email: 'analyst@threatverse.io',
    name: 'Analyst User',
    role: 'analyst',
    avatar: 'S',
  },
  {
    id: 'u-003',
    email: 'viewer@threatverse.io',
    name: 'Viewer User',
    role: 'viewer',
    avatar: 'V',
  },
];

export const dashboardData = {
  overviewStats: [
    { label: 'Monitored Assets', value: '34.6K', delta: '+8.2%', tone: 'up' },
    { label: 'Critical Incidents', value: '06', delta: '-2 vs last hour', tone: 'down' },
    { label: 'AI Confidence', value: '96.4%', delta: '+3.1%', tone: 'up' },
    { label: 'SOC Response', value: '42 sec', delta: '-14 sec', tone: 'down' },
  ],
  threatLevel: 'HIGH',
  activeThreats: 12,
  mitigated: 847,
  alertQueue: [
    'Blocked 12 phishing domains from outbound email',
    'Isolated 2 endpoints with ransomware signatures',
    'Reset 9 risky sessions for privileged identities',
  ],
  threatDistribution: [
    { name: 'Malware', value: 42, color: '#6fe7ff' },
    { name: 'Phishing', value: 27, color: '#7a7dff' },
    { name: 'Lateral Movement', value: 18, color: '#62ffb5' },
    { name: 'Data Exfiltration', value: 13, color: '#ff5d73' },
  ],
  timeline: [40, 65, 30, 85, 50, 70, 45, 90],
  incidents: [
    {
      type: 'Phishing Email Campaign',
      severity: 'High',
      status: 'Contained',
      detected: '2 hours ago',
    },
    {
      type: 'Suspicious Login Pattern',
      severity: 'Medium',
      status: 'Investigating',
      detected: '4 hours ago',
    },
    {
      type: 'Ransomware Detection',
      severity: 'High',
      status: 'Resolved',
      detected: '1 day ago',
    },
  ],
  topThreats: [
    { name: 'Brute Force Attacks', count: 234 },
    { name: 'Malware Variants', count: 127 },
    { name: 'SQL Injection Attempts', count: 89 },
    { name: 'Data Exfiltration Attempts', count: 45 },
  ],
};

export const threatIntelData = [
  {
    id: 1,
    name: 'APT28 Campaign',
    severity: 'critical',
    sources: 342,
    confidence: 98,
    targets: ['Government', 'Defense', 'Aerospace'],
    indicators: 2847,
  },
  {
    id: 2,
    name: 'Emotet Botnet Resurgence',
    severity: 'high',
    sources: 218,
    confidence: 94,
    targets: ['Finance', 'Healthcare'],
    indicators: 1923,
  },
  {
    id: 3,
    name: 'LockBit Ransomware Variant',
    severity: 'high',
    sources: 165,
    confidence: 91,
    targets: ['Manufacturing', 'Retail'],
    indicators: 1456,
  },
  {
    id: 4,
    name: 'Supply Chain Compromise',
    severity: 'medium',
    sources: 89,
    confidence: 78,
    targets: ['Technology', 'Enterprise'],
    indicators: 654,
  },
];

export const incidentsData = [
  {
    id: 'INC-2024-001',
    title: 'Credential Stuffing Attack - Marketing Dept',
    severity: 'high',
    status: 'investigating',
    created: '2 hours ago',
    updated: '12 minutes ago',
    affected: 34,
    assets: ['Email System', 'VPN Gateway', 'Identity Provider'],
  },
  {
    id: 'INC-2024-002',
    title: 'Malware Detected on Endpoint',
    severity: 'critical',
    status: 'contained',
    created: '5 hours ago',
    updated: '1 hour ago',
    affected: 2,
    assets: ['Workstation-142', 'Backup Server'],
  },
  {
    id: 'INC-2024-003',
    title: 'Suspicious Cloud Activity',
    severity: 'medium',
    status: 'monitoring',
    created: '1 day ago',
    updated: '2 hours ago',
    affected: 8,
    assets: ['AWS Account', 'S3 Bucket'],
  },
  {
    id: 'INC-2024-004',
    title: 'Phishing Email Campaign',
    severity: 'high',
    status: 'resolved',
    created: '3 days ago',
    updated: '2 days ago',
    affected: 156,
    assets: ['Email Gateway', 'User Accounts'],
  },
];

export const analyticsData = {
  detectionRate: 99.2,
  mttr: '4.2m',
  mttd: '1.8m',
  falsePositiveRate: 3.2,
  distribution: [
    { name: 'Malware', count: 345, percent: 35 },
    { name: 'Phishing', count: 276, percent: 28 },
    { name: 'Ransomware', count: 218, percent: 22 },
    { name: 'Credential Abuse', count: 152, percent: 15 },
  ],
  methods: [
    { name: 'Behavioral Analysis', count: 2847, successRate: '98.3%' },
    { name: 'Threat Intelligence Feed', count: 1923, successRate: '96.1%' },
    { name: 'Anomaly Detection', count: 1456, successRate: '94.7%' },
    { name: 'Signature-Based Detection', count: 987, successRate: '91.2%' },
  ],
};

export const settingsData = {
  notifications: true,
  emailAlerts: true,
  darkMode: true,
  autoResponse: false,
  dataRetention: '90',
  teamMembers: [
    { name: 'John Smith', role: 'Admin' },
    { name: 'Sarah Johnson', role: 'Analyst' },
    { name: 'Mike Davis', role: 'Analyst' },
  ],
};

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function apiFetch(path, options = {}) {
  const headers = new Headers({
    ...(options.headers || {}),
  });

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body !== undefined && !(options.body instanceof FormData)
      ? JSON.stringify(options.body)
      : options.body,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }

  return payload;
}

export const authApi = {
  login: (email, password) =>
    apiFetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    }),
  me: () => apiFetch('/api/me'),
};

export const dashboardApi = {
  getDashboard: () => apiFetch('/api/dashboard'),
  getThreats: () => apiFetch('/api/threats'),
  getIncidents: () => apiFetch('/api/incidents'),
  getAnalytics: () => apiFetch('/api/analytics'),
  getSettings: () => apiFetch('/api/settings'),
  updateSettings: (settings) =>
    apiFetch('/api/settings', {
      method: 'POST',
      body: { settings },
    }),
};

export default {
  users,
  dashboardData,
  threatIntelData,
  incidentsData,
  analyticsData,
  settingsData,
  authApi,
  dashboardApi,
};


































































































































































































































































































































































































































































































































































































