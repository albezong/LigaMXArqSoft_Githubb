import api from './api'

// Obtener todos los usuarios
export const getUsuarios = async () => {
  const r = await api.get('/ApiLiga/Obtener/Usuarios')
  console.log("API USUARIOS RESPUESTA:", r.data)
  return r.data
}

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
  const r = await api.get(`/ApiLiga/Obtener/UsuariosById/${id}`)
  console.log("API USUARIO POR ID RESPUESTA:", r.data)
  return r.data
}

// Crear usuario
export const crearUsuario = async (usuario) => {
  const r = await api.post('/ApiLiga/Insertar/Usuario', usuario)
  console.log("API CREAR USUARIO RESPUESTA:", r.data)
  return r.data
}

// Actualizar usuario
export const actualizarUsuario = async (id, usuario) => {
  const r = await api.put(`/ApiLiga/Actualizar/Usuario/${id}`, usuario)
  console.log("API ACTUALIZAR USUARIO RESPUESTA:", r.data)
  return r.data
}

// Eliminar usuario
export const eliminarUsuario = async (id) => {
  const r = await api.delete(`/ApiLiga/Eliminar/Usuario/${id}`)
  console.log("API ELIMINAR USUARIO RESPUESTA:", r.data)
  return r.data
}
