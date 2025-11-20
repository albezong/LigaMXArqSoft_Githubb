import api from './api'

// Obtener todos los partidos
// Obtener todos los partidos
export const getPartidos = async () => {
  const r = await api.get('/ApiLiga/Obtener/Partidos')
  console.log("API PARTIDOS RESPUESTA:", r.data)
  return r.data
}


// Obtener partido por ID
export const getPartidoById = (id) =>
  api.get(`/ApiLiga/Obtener/PartidosId/${id}`)
     .then(r => r.data.data)

// Crear un nuevo partido
export const crearPartido = (partido) =>
  api.post('/ApiLiga/Insertar/Partidos', partido)
     .then(r => r.data.data)

// Actualizar un partido existente
export const actualizarPartido = (id, partido) =>
  api.put(`/ApiLiga/Actualizar/Partido/${id}`, partido)
     .then(r => r.data.data)

// Eliminar un partido
export const eliminarPartido = (id) =>
  api.delete(`/ApiLiga/Eliminar/partido/${id}`)
     .then(r => r.data)
