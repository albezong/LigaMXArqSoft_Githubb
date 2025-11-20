import api from './api'

// Obtener todos los usuarios
export const getUsuarios = () =>
  api.get('/ApiLiga/Obtener/Usuarios')
     .then(r => r.data.data)

// Obtener usuario por ID
export const getUsuarioById = (id) =>
  api.get(`/ApiLiga/Obtener/UsuariosById/${id}`)
     .then(r => r.data.data)

// Crear usuario
export const crearUsuario = (usuario) =>
  api.post('/ApiLiga/Insertar/Usuario', usuario)
     .then(r => r.data.data)

// Actualizar usuario
export const actualizarUsuario = (id, usuario) =>
  api.put(`/ApiLiga/Actualizar/Usuario/${id}`, usuario)
     .then(r => r.data.data)

// Eliminar usuario
export const eliminarUsuario = (id) =>
  api.delete(`/ApiLiga/Eliminar/Usuario/${id}`)
     .then(r => r.data)
