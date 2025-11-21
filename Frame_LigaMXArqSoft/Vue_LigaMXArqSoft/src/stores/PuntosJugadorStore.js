// src/stores/puntosStore.js
import { defineStore } from 'pinia'
import * as svc from '../services/PuntosJugadorService'
import router from '../router'   // Opcional si quieres redirigir

export const usePuntosStore = defineStore('puntos', {
  state: () => ({
    items: [],        // todos los puntos
    selected: null,   // punto seleccionado por ID
    loading: false,
    error: null
  }),

  actions: {
    // Obtener todos los puntos
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        this.items = await svc.getPuntos()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    // Obtener punto por ID
    async fetchById(id) {
      this.loading = true
      this.error = null
      try {
        this.selected = await svc.getPuntosById(id)
        return this.selected
      } catch (e) {
        this.error = e
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    // Crear nuevo punto
    async create(puntos) {
      this.loading = true
      this.error = null
      try {
        await svc.crearPuntos(puntos)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    // Actualizar punto existente
    async update(puntos) {
      this.loading = true
      this.error = null
      try {
        await svc.actualizarPuntos(puntos.id, puntos)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    // Eliminar punto por ID
    async remove(id) {
      this.loading = true
      this.error = null
      try {
        await svc.eliminarPuntos(id)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})
