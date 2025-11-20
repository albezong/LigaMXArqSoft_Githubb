// src/services/api.js
import axios from 'axios'

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:49986'

const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
})

// interceptor (opcional): manejar errores globales
api.interceptors.response.use(
  res => res,
  err => {
    // aquí podrías agregar lógica: mostrar toast, logging, etc.
    return Promise.reject(err)
  }
)

export default api
