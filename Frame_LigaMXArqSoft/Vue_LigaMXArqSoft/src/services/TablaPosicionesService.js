import api from './api'

// Obtener todos los registros de la tabla de posiciones
export const getRegistros = () =>
  api.get('/ApiLiga/Obtener/Registros')
     .then(r => r.data.data)

// Obtener un registro por ID
export const getRegistroById = (id) =>
  api.get(`/ApiLiga/Obtener/RegistrosId/${id}`)
     .then(r => r.data.data)

// Crear un nuevo registro
export const crearRegistro = (registro) =>
  api.post('/ApiLiga/Insertar/Registro', registro)
     .then(r => r.data.data)

// Actualizar un registro existente
export const actualizarRegistro = (id, registro) =>
  api.put(`/ApiLiga/Actualizar/Registro/${id}`, registro)
     .then(r => r.data.data)

// Eliminar un registro
export const eliminarRegistro = (id) =>
  api.delete(`/ApiLiga/Eliminar/registro/${id}`)
     .then(r => r.data)
