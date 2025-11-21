<template>
  <v-app>
    <v-main>
      <v-container>

        <h1 class="text-h4 font-weight-bold mb-6">Gestión de Jugadores</h1>

        <!-- FORMULARIO -->
        <v-card elevation="8" class="pa-4 mb-6">
          <h3 class="text-h6 font-weight-bold mb-4">
            {{ editIndex === -1 ? "Agregar Jugador" : "Editar Jugador" }}
          </h3>

          <v-form @submit.prevent="savePlayer">

            <v-text-field
              v-model="form.nombre"
              label="Nombre"
              prepend-inner-icon="mdi-account"
              required
            />

            <v-text-field
              v-model="form.apellido"
              label="Apellido"
              prepend-inner-icon="mdi-account-outline"
              required
            />

            <v-text-field
              v-model="form.posicion"
              label="Posición"
              prepend-inner-icon="mdi-basketball"
              required
            />

            <v-text-field
              v-model="form.numero"
              label="Número"
              type="number"
              prepend-inner-icon="mdi-pound"
              required
            />

            <v-text-field
              v-model="form.imagen"
              label="URL Imagen del Jugador"
              prepend-inner-icon="mdi-image"
              required
            />

            <v-btn type="submit" color="primary" class="mt-3">
              {{ editIndex === -1 ? "Agregar" : "Guardar Cambios" }}
            </v-btn>

            <v-btn
              v-if="editIndex !== -1"
              class="mt-3 ml-3"
              color="grey"
              @click="cancelEdit"
            >
              Cancelar
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayersCRUD",

  data() {
    return {
      players: [],

      form: {
        id: 0,
        nombre: "",
        apellido: "",
        posicion: "",
        numero: "",
        imagen: "",
        equipoId: 0
      },

      editIndex: -1,
      loading: false
    };
  },

  created() {
    this.getPlayers();
  },

  methods: {
    /* ============================
       GET: Obtener lista de jugadores
    ============================*/
    async getPlayers() {
      try {
        const res = await axios.get("http://localhost:49986/ApiLiga/Obtener/Jugadoress");

        console.log("API RESPONSE:", res.data);

        const data = Array.isArray(res.data) ? res.data : [res.data];

        this.players = data.map(j => ({
          id: j.Id,
          nombre: j.Nombre,
          apellido: j.Apellido_Paterno,
          posicion: j.Posicion,
          numero: j.Numero,
          imagen: j.imagenURL,
          equipoId: j.EquipoId
        }));

        console.log("PLAYERS MAPEADOS:", this.players);

      } catch (err) {
        console.error("Error al obtener jugadores:", err);
      }
    },

    /* ============================
       POST O PUT: Guardar jugador
    ============================*/
    async savePlayer() {
      if (
        !this.form.nombre ||
        !this.form.apellido ||
        !this.form.posicion ||
        !this.form.numero ||
        !this.form.imagen
      ) {
        alert("Completa todos los campos");
        return;
      }

      try {
        if (this.editIndex === -1) {
          /* ===== INSERTAR ===== */
          await axios.post(
            "http://localhost:49986/ApiLiga/Insertar/Jugadorr",
            {
              Id: 0,
              Nombre: this.form.nombre,
              Apellido_Paterno: this.form.apellido,
              Posicion: this.form.posicion,
              imagenURL: this.form.imagen,
              Numero: this.form.numero,
              EquipoId: this.form.equipoId
            }
          );

          alert("Jugador agregado correctamente");
        } else {
          /* ===== ACTUALIZAR ===== */
          await axios.put(
            `http://localhost:49986/ApiLiga/Actualizar/Jugadorr/${this.form.id}`,
            {
              Id: this.form.id,
              Nombre: this.form.nombre,
              Apellido_Paterno: this.form.apellido,
              Posicion: this.form.posicion,
              imagenURL: this.form.imagen,
              Numero: this.form.numero,
              EquipoId: this.form.equipoId
            }
          );

          alert("Jugador actualizado");
        }

        this.resetForm();
        this.getPlayers();
      } catch (err) {
        console.error("Error al guardar jugador:", err);
      }
    },

    /* ============================
       Editar jugador
    ============================*/
    editPlayer(index) {
      const p = this.players[index];
      this.editIndex = index;

      this.form = {
        id: p.id,
        nombre: p.nombre,
        apellido: p.apellido,
        posicion: p.posicion,
        numero: p.numero,
        imagen: p.imagen,
        equipoId: p.equipoId
      };
    },

    /* ============================
        DELETE Jugador
    ============================*/
    async deletePlayer(index) {
      const id = this.players[index].id;

      if (!confirm("¿Eliminar jugador?")) return;

      try {
        await axios.delete(
          `http://localhost:49986/ApiLiga/Eliminar/Jugadorr/${id}`
        );

        alert("Jugador eliminado");
        this.getPlayers();
      } catch (err) {
        console.error("Error al eliminar jugador:", err);
      }
    },

    cancelEdit() {
      this.resetForm();
    },

    resetForm() {
      this.form = {
        id: 0,
        nombre: "",
        apellido: "",
        posicion: "",
        numero: "",
        imagen: "",
        equipoId: 0
      };
      this.editIndex = -1;
    }
  }
};
</script>


<style scoped>
</style>
