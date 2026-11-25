const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : null;

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.fieldErrors = data?.fieldErrors || {};
    throw error;
  }

  if (data === null) {
    throw new Error('Backend API is unavailable (received non-JSON response).');
  }

  return data;
}

export const portfolioApi = {
  getHealth: () => request('/health'),
  getPortfolio: () => request('/portfolio'),
  likeProject: (id) => request(`/projects/${id}/like`, { method: 'POST' }),
  postEndorsement: (payload) =>
    request('/endorsements', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  submitContact: (payload) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getAdminMessages: (adminKey) =>
    request('/admin/messages', {
      headers: { 'X-Admin-Key': adminKey },
    }),
  markMessageRead: (id, adminKey) =>
    request(`/admin/messages/${id}/read`, {
      method: 'PATCH',
      headers: { 'X-Admin-Key': adminKey },
    }),
  deleteMessage: (id, adminKey) =>
    request(`/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Key': adminKey },
    }),
  createProject: (payload, adminKey) =>
    request('/admin/projects', {
      method: 'POST',
      headers: { 'X-Admin-Key': adminKey },
      body: JSON.stringify(payload),
    }),
  deleteProject: (id, adminKey) =>
    request(`/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Key': adminKey },
    }),
  resumeDownloadUrl: `${API_BASE}/resume/download`,
};
