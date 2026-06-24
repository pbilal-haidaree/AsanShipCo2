// API service layer. Fetch-based client with JWT auth for cars, customers, orders, and images.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...authHeaders(),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed (${res.status})`);
  }

  return res.json();
}

function json(path, method, data) {
  return request(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// Auth
export async function login(email, password) {
  const data = await json('/auth/login', 'POST', { email, password });
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getStoredUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

export function getMe() {
  return request('/auth/me');
}

// Cars
export function getCars() {
  return request('/api/cars');
}

export function getAvailableCars() {
  return request('/api/cars/available');
}

export function createCar(data) {
  return json('/api/cars', 'POST', data);
}

export function updateCar(id, data) {
  return json(`/api/cars/${id}`, 'PUT', data);
}

export function deleteCar(id) {
  return request(`/api/cars/${id}`, { method: 'DELETE' });
}

// Car Images
export function uploadCarImages(carId, files) {
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  return request(`/api/cars/${carId}/images`, {
    method: 'POST',
    body: formData,
  });
}

export function deleteCarImage(carId, filename) {
  return request(`/api/cars/${carId}/images/${filename}`, { method: 'DELETE' });
}

export function imageUrl(path) {
  return `${API_BASE}/uploads/${path}`;
}

// Customers
export function getCustomers() {
  return request('/api/customers');
}

export function createCustomer(data) {
  return json('/api/customers', 'POST', data);
}

export function updateCustomer(id, data) {
  return json(`/api/customers/${id}`, 'PUT', data);
}

export function deleteCustomer(id) {
  return request(`/api/customers/${id}`, { method: 'DELETE' });
}

// Orders
export function getOrders() {
  return request('/api/orders');
}

export function createOrder(data) {
  return json('/api/orders', 'POST', data);
}

export function updateOrder(id, data) {
  return json(`/api/orders/${id}`, 'PUT', data);
}

export function deleteOrder(id) {
  return request(`/api/orders/${id}`, { method: 'DELETE' });
}
