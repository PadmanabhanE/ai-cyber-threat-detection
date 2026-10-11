import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

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

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'threatverse-demo-secret';

app.use(cors());
app.use(express.json());

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization token.' });
  }

  const token = header.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is expired or invalid.' });
  }
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ThreatVerse API' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user || password !== 'demo') {
    return res.status(401).json({ message: 'Invalid credentials. Use one of the demo accounts.' });
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

  return res.json({
    token,
    user: {
      ...payload,
      lastLogin: new Date().toISOString(),
    },
  });
});

app.get('/api/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/dashboard', authenticate, (req, res) => {
  res.json(dashboardData);
});

app.get('/api/threats', authenticate, (req, res) => {
  res.json({ threats: threatIntelData });
});

app.get('/api/incidents', authenticate, (req, res) => {
  res.json({ incidents: incidentsData });
});

app.get('/api/analytics', authenticate, (req, res) => {
  res.json({ analytics: analyticsData });
});

app.get('/api/settings', authenticate, (req, res) => {
  res.json({ settings: settingsData });
});

app.post('/api/settings', authenticate, (req, res) => {
  const incomingSettings = req.body?.settings || {};
  const merged = {
    ...settingsData,
    ...incomingSettings,
  };

  Object.assign(settingsData, merged);
  res.json({ settings: settingsData });
});

app.listen(PORT, () => {
  console.log(`ThreatVerse API listening on http://localhost:${PORT}`);
});
