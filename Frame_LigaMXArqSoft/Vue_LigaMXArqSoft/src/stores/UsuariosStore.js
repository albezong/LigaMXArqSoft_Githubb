// src/stores/usuariosStore.js
import { defineStore } from 'pinia'
import * as svc from '../services/UsuariosService'

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    items: [],
    selected: null,   // usuario seleccionado por id
    loading: false,
    error: null
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

    async fetchById(id) {
      this.loading = true
      this.error = null
      try {
        this.selected = await svc.getUsuarioById(id)
        return this.selected // por si quieres usar el valor directamente
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
