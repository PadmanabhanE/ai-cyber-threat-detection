import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {
  dashboardData,
  threatIntelData,
  incidentsData,
  analyticsData,
  settingsData,
  users,
} from './mockData.js';

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
