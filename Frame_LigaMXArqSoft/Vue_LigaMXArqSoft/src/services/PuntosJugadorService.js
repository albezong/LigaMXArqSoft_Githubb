import api from './api'

// Obtener todos los puntos
export const getPuntos = async () => {
  const r = await api.get('/ApiLiga/Obtener/Puntos')
  console.log("API PUNTOS RESPUESTA:", r.data)
  return r.data
}

// Obtener puntos por ID
export const getPuntosById = async (id) => {
  const r = await api.get(`/ApiLiga/Obtener/PuntosId/${id}`)
  console.log("API PUNTOS POR ID RESPUESTA:", r.data)
  return r.data
}

// Crear puntos
export const crearPuntos = async (puntos) => {
  const r = await api.post('/ApiLiga/Insertar/Puntos', puntos)
  console.log("API CREAR PUNTOS RESPUESTA:", r.data)
  return r.data
}

// Actualizar puntos
export const actualizarPuntos = async (id, puntos) => {
  const r = await api.put(`/ApiLiga/Actualizar/Puntos/${id}`, puntos)
  console.log("API ACTUALIZAR PUNTOS RESPUESTA:", r.data)
  return r.data
}

// Eliminar puntos
export const eliminarPuntos = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/Puntos/${id}`)
  console.log("API ELIMINAR PUNTOS RESPUESTA:", r.data)
  return r.data
}
