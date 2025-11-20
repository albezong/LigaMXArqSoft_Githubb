import { defineStore } from 'pinia'
import * as svc from '../services/entrenadores' // 👈 importa tu servicio de entrenadores

export const useEntrenadoresStore = defineStore('entrenadores', {
  state: () => ({
    entrenadores: [], // lista de entrenadores
    selected: null,   // entrenador seleccionado por id
    loading: false,
    error: null
  }),
  actions: {
    // Obtener todos los entrenadores
    async fetchAll() {
      this.loading = true
      try {
        this.entrenadores = await svc.getEntrenadores()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Obtener un entrenador por ID
    async fetchById(id) {
      this.loading = true
      try {
        this.selected = await svc.getEntrenadorById(id)
        return this.selected
      } catch (err) {
        this.error = err
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    // Crear un nuevo entrenador
    async create(entrenador) {
      this.loading = true
      try {
        await svc.crearEntrenador(entrenador)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Actualizar un entrenador existente
    async update(entrenador) {
      this.loading = true
      try {
        await svc.actualizarEntrenador(entrenador.id, entrenador)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Eliminar un entrenador
    async remove(id) {
      this.loading = true
      try {
        await svc.eliminarEntrenador(id)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  }
})
