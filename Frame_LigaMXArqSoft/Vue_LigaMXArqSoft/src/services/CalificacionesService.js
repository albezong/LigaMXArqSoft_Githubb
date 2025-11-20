import api from './api'

// Obtener todas las calificaciones
export const getCalificaciones = async () => {
  const r = await api.get('/ApiLiga/Obtener/calificaciones')
  console.log("API CALIFICACIONES RESPUESTA:", r.data)
  return r.data
}

// Obtener calificación por ID
export const getCalificacionById = async (id) => {
  const r = await api.get(`/ApiLiga/Obtener/CalificacionesId/${id}`)
  console.log("API CALIFICACION POR ID RESPUESTA:", r.data)
  return r.data
}

// Crear una nueva calificación
export const crearCalificacion = async (calificacion) => {
  const r = await api.post('/ApiLiga/Insertar/Calificacion', calificacion)
  console.log("API CREAR CALIFICACION RESPUESTA:", r.data)
  return r.data
}

// Actualizar una calificación existente
export const actualizarCalificacion = async (id, calificacion) => {
  const r = await api.put(`/ApiLiga/Actualizar/calificacion/${id}`, calificacion)
  console.log("API ACTUALIZAR CALIFICACION RESPUESTA:", r.data)
  return r.data
}

// Eliminar una calificación
export const eliminarCalificacion = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/calificacion/${id}`)
  console.log("API ELIMINAR CALIFICACION RESPUESTA:", r.data)
  return r.data
}
