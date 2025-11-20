// src/stores/usuariosStore.js
import { defineStore } from 'pinia'
import * as svc from '../services/UsuariosService'
import router from '../router'   // <-- IMPORTANTE para redirigir

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    items: [],
    selected: null,
    loading: false,
    error: null,
    authUser: null    // usuario logueado
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        this.items = await svc.getUsuarios()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        // 1. Cargar todos los usuarios
        const usuarios = await svc.getUsuarios()

        // 2. Buscar coincidencia
        const user = usuarios.find(
          u => u.Email === email && u.Contraseña === password
        )

        // 3. Validar
        if (!user) {
          this.error = 'Usuario o contraseña incorrectos'
          return false
        }

        // 4. Guardar usuario autenticado
        this.authUser = user

        // 5. Redirigir a /games
        router.push('/games')

        return true

      } catch (e) {
        this.error = 'Error al iniciar sesión'
        return false
      } finally {
        this.loading = false
      }
    },

    async fetchById(id) {
      this.loading = true
      this.error = null
      try {
        this.selected = await svc.getUsuarioById(id)
        return this.selected
      } catch (e) {
        this.error = e
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    async create(usuario) {
      this.loading = true
      try {
        await svc.crearUsuario(usuario)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async update(usuario) {
      this.loading = true
      try {
        await svc.actualizarUsuario(usuario.id, usuario)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async remove(id) {
      this.loading = true
      try {
        await svc.eliminarUsuario(id)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})
