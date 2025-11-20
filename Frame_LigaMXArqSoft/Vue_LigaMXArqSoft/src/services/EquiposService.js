import api from './api'

// Obtener todos los equipos
export const getEquipos = () =>
  api.get('/ApiLiga/Obtener/equipos')
     .then(r => r.data.data)

// Obtener equipo por ID
export const getEquipoById = (id) =>
  api.get(`/ApiLiga/Obtener/EquiposById/${id}`)
     .then(r => r.data.data)

// Crear un nuevo equipo
export const crearEquipo = (equipo) =>
  api.post('/ApiLiga/Insertar/Equipo', equipo)
     .then(r => r.data.data)

// Actualizar un equipo existente
export const actualizarEquipo = (id, equipo) =>
  api.put(`/ApiLiga/Actualizar/Equipo/${id}`, equipo)
     .then(r => r.data.data)

// Eliminar un equipo
export const eliminarEquipo = (id) =>
  api.delete(`/ApiLiga/Eliminar/Equipo/${id}`)
     .then(r => r.data)
