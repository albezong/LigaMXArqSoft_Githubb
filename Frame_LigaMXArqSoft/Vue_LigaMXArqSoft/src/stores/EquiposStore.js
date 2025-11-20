import { defineStore } from 'pinia'
import * as svc from '../services/equipos' // 👈 importa tu servicio de equipos

export const useEquiposStore = defineStore('equipos', {
  state: () => ({
    equipos: [],      // lista de equipos
    selected: null,   // equipo seleccionado por id
    loading: false,
    error: null
  }),
  actions: {
    // Obtener todos los equipos
    async fetchAll() {
      this.loading = true
      try {
        this.equipos = await svc.getEquipos()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Obtener un equipo por ID
    async fetchById(id) {
      this.loading = true
      try {
        this.selected = await svc.getEquipoById(id)
        return this.selected
      } catch (err) {
        this.error = err
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    // Crear un nuevo equipo
    async create(equipo) {
      this.loading = true
      try {
        await svc.crearEquipo(equipo)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Actualizar un equipo existente
    async update(equipo) {
      this.loading = true
      try {
        await svc.actualizarEquipo(equipo.id, equipo)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Eliminar un equipo
    async remove(id) {
      this.loading = true
      try {
        await svc.eliminarEquipo(id)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  }
})
