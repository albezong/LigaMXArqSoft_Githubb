import { defineStore } from 'pinia'
import * as svc from '../services/EquiposService' // 👈 importa tu servicio de equipos

export const useEquiposStore = defineStore('equipos', {
  state: () => ({
    equipos: [],      // lista de equipos
    selected: null,   // equipo seleccionado por id
    selectedEquipo: null, // 👈 agregamos este
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
    async fetchEquipoById(id) {
      this.loading = true;
      this.error = null;

      try {
        const data = await svc.getEquipoById(id);
        this.selectedEquipo = Array.isArray(data) && data.length > 0 ? data[0] : null;
      } catch (err) {
        this.error = "Error obteniendo el equipo";
        this.selectedEquipo = null;
      } finally {
        this.loading = false;
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
      this.loading = true;
      try {
        await svc.actualizarEquipo(equipo.Id, equipo); // 👈 asegurarnos de que sea Id
        await this.fetchAll();
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
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
