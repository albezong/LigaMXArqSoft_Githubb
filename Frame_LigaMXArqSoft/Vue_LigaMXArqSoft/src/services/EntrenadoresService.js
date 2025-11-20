import api from './api'

// Obtener todos los entrenadores
export const getEntrenadores = async () => {
  const r = await api.get('/ApiLiga/Obtener/Entrenadores')
  console.log("API ENTRENADORES RESPUESTA:", r.data)
  return r.data
}

// Obtener entrenador por ID
export const getEntrenadorById = async (id) => {
  const r = await api.get(`/ApiLiga/Obtener/EntrenadoresId/${id}`)
  console.log("API ENTRENADOR POR ID RESPUESTA:", r.data)
  return r.data
}

// Crear entrenador
export const crearEntrenador = async (entrenador) => {
  const r = await api.post('/ApiLiga/Insertar/Entrenador', entrenador)
  console.log("API CREAR ENTRENADOR RESPUESTA:", r.data)
  return r.data
}

// Actualizar entrenador
export const actualizarEntrenador = async (id, entrenador) => {
  const r = await api.put(`/ApiLiga/Actualizar/Entrenador/${id}`, entrenador)
  console.log("API ACTUALIZAR ENTRENADOR RESPUESTA:", r.data)
  return r.data
}

// Eliminar entrenador
export const eliminarEntrenador = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/Entrenador/${id}`)
  console.log("API ELIMINAR ENTRENADOR RESPUESTA:", r.data)
  return r.data
}
