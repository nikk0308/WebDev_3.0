import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // работает через proxy
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
