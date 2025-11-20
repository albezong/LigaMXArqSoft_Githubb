import { defineStore } from 'pinia'
import * as svc from '../services/PartidosService' // 👈 importa tu servicio de partidos

export const usePartidosStore = defineStore('partidos', {
  state: () => ({
    partidos: [],     // lista de partidos
    selected: null,   // partido seleccionado por id
    loading: false,
    error: null
  }),
  actions: {
    // Obtener todos los partidos
    async fetchAll() {
      this.loading = true
      try {
        this.partidos = await svc.getPartidos()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Obtener un partido por ID
    async fetchById(id) {
      this.loading = true
      try {
        this.selected = await svc.getPartidoById(id)
        return this.selected
      } catch (err) {
        this.error = err
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    // Crear un nuevo partido
    async create(partido) {
      this.loading = true
      try {
        await svc.crearPartido(partido)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Actualizar un partido existente
    async update(partido) {
      this.loading = true
      try {
        await svc.actualizarPartido(partido.id, partido)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Eliminar un partido
    async remove(id) {
      this.loading = true
      try {
        await svc.eliminarPartido(id)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  }
})
