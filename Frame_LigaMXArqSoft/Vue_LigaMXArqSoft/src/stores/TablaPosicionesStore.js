import { defineStore } from 'pinia'
import * as svc from '../services/TablaPosicionesService'

export const useRegistrosStore = defineStore('registros', {
  state: () => ({
    items: [],        // lista de registros
    selected: null,   // registro seleccionado por id
    loading: false,
    error: null
  }),
  actions: {
    // Obtener todos los registros
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        this.items = await svc.getRegistros()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    // Obtener un registro por ID
    async fetchById(id) {
      this.loading = true
      this.error = null
      try {
        this.selected = await svc.getRegistroById(id)
        return this.selected
      } catch (e) {
        this.error = e
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    // Crear un nuevo registro
    async create(registro) {
      this.loading = true
      try {
        await svc.crearRegistro(registro)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    // Actualizar un registro existente
    async update(registro) {
      this.loading = true
      try {
        await svc.actualizarRegistro(registro.id, registro)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    // Eliminar un registro
    async remove(id) {
      this.loading = true
      try {
        await svc.eliminarRegistro(id)
        await this.fetchAll()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})
