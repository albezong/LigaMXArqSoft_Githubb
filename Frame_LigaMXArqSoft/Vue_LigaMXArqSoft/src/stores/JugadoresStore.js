import { defineStore } from 'pinia'
import * as svc from '../services/JugadoresService' // 👈 importa tu servicio de jugadores

export const useJugadoresStore = defineStore('jugadores', {
  state: () => ({
    jugadores: [],    // lista de jugadores
    selected: null,   // jugador seleccionado por id
    loading: false,
    error: null
  }),
  actions: {
    // Obtener todos los jugadores
    async fetchAll() {
      this.loading = true
      try {
        this.jugadores = await svc.getJugadores()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Obtener un jugador por ID
    async fetchById(id) {
      this.loading = true
      try {
        this.selected = await svc.getJugadorById(id)
        return this.selected
      } catch (err) {
        this.error = err
        this.selected = null
      } finally {
        this.loading = false
      }
    },

    // Crear un nuevo jugador
    async create(jugador) {
      this.loading = true
      try {
        await svc.crearJugador(jugador)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Actualizar un jugador existente
    async update(jugador) {
      this.loading = true
      try {
        await svc.actualizarJugador(jugador.Id, jugador)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },

    // Eliminar un jugador
    async remove(id) {
      this.loading = true
      try {
        await svc.eliminarJugador(id)
        await this.fetchAll()
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  }
})
