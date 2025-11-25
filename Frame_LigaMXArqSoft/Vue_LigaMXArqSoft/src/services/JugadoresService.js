import api from './api'

// Obtener todos los jugadores
export const getJugadores = async () => {
  const r = await api.get('/ApiLiga/Obtener/Jugadoress')
  console.log("API JUGADORES RESPUESTA:", r.data)
  return r.data
}

// Obtener jugador por ID
export const getJugadorById = async (id) => {
  const r = await api.get(`/ApiLiga/Obtener/JugadoressId`, {
    params: { id }
  });
  console.log("API JUGADOR POR ID RESPUESTA:", r.data);
  return r.data;
};

// Crear jugador
export const crearJugador = async (jugador) => {
  const r = await api.post('/ApiLiga/Insertar/Jugadorr', jugador)
  console.log("API CREAR JUGADOR RESPUESTA:", r.data)
  return r.data
}

// Actualizar jugador
export const actualizarJugador = async (id, jugador) => {
  const r = await api.put(`/ApiLiga/Actualizar/Jugadorr/${id}`, jugador)
  console.log("API ACTUALIZAR JUGADOR RESPUESTA:", r.data)
  return r.data
}

// Eliminar jugador
export const eliminarJugador = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/Jugador/${id}`)
  console.log("API ELIMINAR JUGADOR RESPUESTA:", r.data)
  return r.data
}
