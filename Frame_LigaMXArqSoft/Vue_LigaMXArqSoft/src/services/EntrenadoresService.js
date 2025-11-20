import api from './api'

// Obtener todos los entrenadores
export const getEntrenadores = () =>
  api.get('/ApiLiga/Obtener/Entrenadores')
     .then(r => r.data.data)

// Obtener entrenador por ID
export const getEntrenadorById = (id) =>
  api.get(`/ApiLiga/Obtener/EntrenadoresId/${id}`)
     .then(r => r.data.data)

// Crear un nuevo entrenador
export const crearEntrenador = (entrenador) =>
  api.post('/ApiLiga/Insertar/Entrenador', entrenador)
     .then(r => r.data.data)

// Actualizar un entrenador existente
export const actualizarEntrenador = (id, entrenador) =>
  api.put(`/ApiLiga/Actualizar/Entrenador/${id}`, entrenador)
     .then(r => r.data.data)

// Eliminar un entrenador
export const eliminarEntrenador = (id) =>
  api.delete(`/ApiLiga/Eliminar/Entrenador/${id}`)
     .then(r => r.data)
