import api from './api'

// Obtener todos los equipos
export const getEquipos = async () => {
  const r = await api.get('/ApiLiga/Obtener/equipos')
  console.log("API EQUIPOS RESPUESTA:", r.data)
  return r.data
}

// Obtener equipo por ID
export const getEquipoById = async (id) => {
  try {
    const r = await api.get(`/ApiLiga/Obtener/EquiposById?id=${id}`);
    console.log("API EQUIPO POR ID RESPUESTA:", r.data);
    return r.data;
  } catch (e) {
    console.error("ERROR API EQUIPO POR ID:", e);
    return [];
  }
};

// Crear equipo
export const crearEquipo = async (equipo) => {
  const r = await api.post('/ApiLiga/Insertar/Equipo', equipo)
  console.log("API CREAR EQUIPO RESPUESTA:", r.data)
  return r.data
}

// Actualizar equipo
export const actualizarEquipo = async (id, equipo) => {
  const r = await api.put(`/ApiLiga/Actualizar/Equipo/${id}`, equipo)
  console.log("API ACTUALIZAR EQUIPO RESPUESTA:", r.data)
  return r.data
}

// Eliminar equipo
export const eliminarEquipo = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/Equipo/${id}`)
  console.log("API ELIMINAR EQUIPO RESPUESTA:", r.data)
  return r.data
}
