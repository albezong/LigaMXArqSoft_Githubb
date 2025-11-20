import { defineStore } from 'pinia'
import * as svc from '../services/calificaciones' // 👈 importa tu servicio de calificaciones

export const useCalificacionesStore = defineStore('calificaciones', {
  state: () => ({
    calificaciones: [], // lista de calificaciones
    selected: null,     // calificación seleccionada por id
    loading: false,
    error: null
  }),
  actions: {
    // Obtener todas las calificaciones
    async fetchAll() {
      this.loading = true
      try {
        this.calificaciones = await svc.getCalificaciones()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Obtener una calificación por ID
    async fetchById(id) {
      this.loading = true
      try {
        this.selected = await svc.getCalificacionById(id)
        return this.selected
      } catch (err) {
        this.error = err
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    // Crear una nueva calificación
    async create(calificacion) {
      this.loading = true
      try {
        await svc.crearCalificacion(calificacion)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Actualizar una calificación existente
    async update(calificacion) {
      this.loading = true
      try {
        await svc.actualizarCalificacion(calificacion.id, calificacion)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Eliminar una calificación
    async remove(id) {
      this.loading = true
      try {
        await svc.eliminarCalificacion(id)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  }
})
