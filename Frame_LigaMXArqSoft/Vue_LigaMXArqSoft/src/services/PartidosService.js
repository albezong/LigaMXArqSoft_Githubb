import api from './api'

// Obtener todos los partidos
export const getPartidos = async () => {
  const r = await api.get('/ApiLiga/Obtener/Partidos')
  console.log("API PARTIDOS RESPUESTA:", r.data)
  return r.data
}

// Obtener partido por ID
export const getPartidoById = async (id) => {
  const r = await api.get(`/ApiLiga/Obtener/PartidosId/${id}`)
  console.log("API PARTIDO POR ID:", r.data)
  return r.data
}

// Crear un nuevo partido
export const crearPartido = async (partido) => {
  const r = await api.post('/ApiLiga/Insertar/Partidos', partido)
  console.log("API CREAR PARTIDO RESPUESTA:", r.data)
  return r.data
}

// Actualizar un partido existente
export const actualizarPartido = async (id, partido) => {
  const r = await api.put(`/ApiLiga/Actualizar/Partido/${id}`, partido)
  console.log("API ACTUALIZAR PARTIDO RESPUESTA:", r.data)
  return r.data
}

// Eliminar un partido
export const eliminarPartido = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/partido/${id}`)
  console.log("API ELIMINAR PARTIDO RESPUESTA:", r.data)
  return r.data
}
