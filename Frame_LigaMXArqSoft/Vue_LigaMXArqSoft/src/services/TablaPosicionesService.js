import api from './api'

// Obtener todos los registros
export const getRegistros = async () => {
  const r = await api.get('/ApiLiga/Obtener/Registros')
  console.log("API REGISTROS RESPUESTA:", r.data)
  return r.data
}

// Obtener registro por ID
export const getRegistroById = async (id) => {
  const r = await api.get(`/ApiLiga/Obtener/RegistrosId/${id}`)
  console.log("API REGISTRO POR ID RESPUESTA:", r.data)
  return r.data
}

// Crear registro
export const crearRegistro = async (registro) => {
  const r = await api.post('/ApiLiga/Insertar/Registro', registro)
  console.log("API CREAR REGISTRO RESPUESTA:", r.data)
  return r.data
}

// Actualizar registro
export const actualizarRegistro = async (id, registro) => {
  const r = await api.put(`/ApiLiga/Actualizar/Registro/${id}`, registro)
  console.log("API ACTUALIZAR REGISTRO RESPUESTA:", r.data)
  return r.data
}

// Eliminar registro
export const eliminarRegistro = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/registro/${id}`)
  console.log("API ELIMINAR REGISTRO RESPUESTA:", r.data)
  return r.data
}
