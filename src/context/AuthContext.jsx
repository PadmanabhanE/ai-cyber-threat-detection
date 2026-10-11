const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function apiFetch(path, options = {}) {
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
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }

  return payload;
}

export const authApi = {
  login: (email, password) => apiFetch('/api/auth/login', {
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
  updateSettings: (settings) => apiFetch('/api/settings', {
    method: 'POST',
    body: { settings },
  }),
};
