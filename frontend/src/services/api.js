import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const candidatosAPI = {
  getAll: () => api.get('/candidatos'),
  getById: (id) => api.get(`/candidatos/${id}`),
  create: (data) => api.post('/candidatos', data),
  update: (id, data) => api.put(`/candidatos/${id}`, data),
  delete: (id) => api.delete(`/candidatos/${id}`),
};

export const empleadosAPI = {
  getAll: () => api.get('/empleados'),
  create: (data) => api.post('/empleados', data),
  update: (id, data) => api.put(`/empleados/${id}`, data),
  delete: (id) => api.delete(`/empleados/${id}`),
};

export const departamentosAPI = {
  getAll: () => api.get('/departamentos'),
  create: (data) => api.post('/departamentos', data),
};

export const cargosAPI = {
  getAll: () => api.get('/cargos'),
  create: (data) => api.post('/cargos', data),
};

export const statsAPI = {
  get: () => api.get('/stats'),
};

export default api;
