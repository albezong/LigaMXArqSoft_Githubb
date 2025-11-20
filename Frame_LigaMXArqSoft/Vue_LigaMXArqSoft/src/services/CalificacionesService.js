import api from './api'

// Obtener todas las calificaciones
export const getCalificaciones = () =>
  api.get('/ApiLiga/Obtener/calificaciones')
     .then(r => r.data.data)

// Obtener calificación por ID
export const getCalificacionById = (id) =>
  api.get(`/ApiLiga/Obtener/CalificacionesId/${id}`)
     .then(r => r.data.data)

// Crear una nueva calificación
export const crearCalificacion = (calificacion) =>
  api.post('/ApiLiga/Insertar/Calificaíon', calificacion)
     .then(r => r.data.data)

// Actualizar una calificación existente
export const actualizarCalificacion = (id, calificacion) =>
  api.put(`/ApiLiga/Actualizar/calificacion/${id}`, calificacion)
     .then(r => r.data.data)

// Eliminar una calificación
export const eliminarCalificacion = (id) =>
  api.delete(`/ApiLiga/Eliminar/calificacion/${id}`)
     .then(r => r.data)
