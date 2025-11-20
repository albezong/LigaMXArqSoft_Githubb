import api from './api'

// Obtener todos los jugadores
export const getJugadores = () =>
  api.get('/ApiLiga/Obtener/Jugadores')
     .then(r => r.data.data)

// Obtener jugador por ID
export const getJugadorById = (id) =>
  api.get(`/ApiLiga/Obtener/JugadoresId/${id}`)
     .then(r => r.data.data)

// Crear un nuevo jugador
export const crearJugador = (jugador) =>
  api.post('/ApiLiga/Insertar/Jugador', jugador)
     .then(r => r.data.data)

// Actualizar un jugador existente
export const actualizarJugador = (id, jugador) =>
  api.put(`/ApiLiga/Actualizar/Jugador/${id}`, jugador)
     .then(r => r.data.data)

// Eliminar un jugador
export const eliminarJugador = (id) =>
  api.delete(`/ApiLiga/Eliminar/Jugador/${id}`)
     .then(r => r.data)
