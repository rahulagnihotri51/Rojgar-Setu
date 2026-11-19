const API = 'http://localhost:5000/api'
const token = () => localStorage.getItem('rs-token')
const request = async (path, options = {}) => {
  const response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token() ? { Authorization: `Bearer ${token()}` } : {}), ...options.headers } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Unable to reach Rojgar Setu server')
  return data
}
export const api = {
  login: body => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: body => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  jobs: () => request('/jobs'), workers: () => request('/workers'),
  postJob: body => request('/jobs', { method: 'POST', body: JSON.stringify(body) }),
  apply: id => request(`/jobs/${id}/apply`, { method: 'POST' }),
  availability: (id, availability) => request(`/workers/${id}/availability`, { method: 'PATCH', body: JSON.stringify({ availability }) })
}
