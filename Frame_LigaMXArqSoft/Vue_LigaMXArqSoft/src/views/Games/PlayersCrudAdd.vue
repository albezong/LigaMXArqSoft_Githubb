<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- BOTÓN Y TÍTULO EN LA MISMA FILA -->
        <div class="d-flex align-center mb-6">
          <v-btn color="grey" variant="outlined" @click="$router.push('/players_crud_list')">
            ← Regresar
          </v-btn>

          <h1 class="text-h4 font-weight-bold ml-4">Gestión de Jugadores</h1>
        </div>


        <!-- FORMULARIO -->
        <v-card elevation="8" class="pa-4 mb-6">
          <h3 class="text-h6 font-weight-bold mb-4">
            {{ editIndex === -1 ? "Agregar Jugador" : "Editar Jugador" }}
          </h3>

          <v-form @submit.prevent="savePlayer">

            <v-text-field v-model="form.nombre" label="Nombre" prepend-inner-icon="mdi-account" required />

            <v-text-field v-model="form.apellido" label="Apellido" prepend-inner-icon="mdi-account-outline" required />

            <v-text-field v-model="form.posicion" label="Posición" prepend-inner-icon="mdi-basketball" required />

            <v-text-field v-model="form.numero" label="Número" type="number" prepend-inner-icon="mdi-pound" required />

            <v-text-field v-model="form.imagen" label="URL Imagen del Jugador" prepend-inner-icon="mdi-image"
              required />

              
              <v-btn v-if="editIndex !== -1" class="mt-3 ml-3" color="grey" @click="cancelEdit">
                Cancelar
              </v-btn>
            </v-form>
            <!-- SELECT DE EQUIPOS -->
            <v-select v-model="form.equipoId" :items="equipos" item-title="Nombre" item-value="Id"
            label="Selecciona un Equipo" prepend-inner-icon="mdi-shield" required class="mb-4" />
            <v-btn type="submit" color="primary" class="mt-3">
              {{ editIndex === -1 ? "Agregar" : "Guardar Cambios" }}
            </v-btn>

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
    equipos: [],

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
  this.getEquipos();
  },

  methods: {
    async getEquipos() {
  try {
    const res = await axios.get("http://localhost:49986/ApiLiga/Obtener/equipos");

    this.equipos = res.data.map(e => ({
      Id: e.Id,
      Nombre: e.Nombre
    }));

    console.log("EQUIPOS CARGADOS:", this.equipos);
  } catch (err) {
    console.error("Error al obtener equipos:", err);
  }
},

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
      // Validaciones
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
        /* ===== INSERTAR ===== */
        if (this.editIndex === -1) {
          await axios.post(
            "http://localhost:49986/ApiLiga/Insertar/Jugador",
            {
              Nombre: this.form.nombre,
              Apellido_Paterno: this.form.apellido,
              Posicion: this.form.posicion,
              imagenURL: this.form.imagen,
              Numero: Number(this.form.numero),
              EquipoId: Number(this.form.equipoId)
            },
            {
              headers: { "Content-Type": "application/json" }
            }
          );

          alert("Jugador agregado correctamente");
        } else {
          /* ===== ACTUALIZAR ===== */
          await axios.put(
            `http://localhost:49986/ApiLiga/Actualizar/Jugador/${this.form.id}`,
            {
              Nombre: this.form.nombre,
              Apellido_Paterno: this.form.apellido,
              Posicion: this.form.posicion,
              imagenURL: this.form.imagen,
              Numero: Number(this.form.numero),
              EquipoId: Number(this.form.equipoId)
            }
          );

          alert("Jugador actualizado");
        }

        this.resetForm();
        this.getPlayers();

      } catch (err) {
        console.error("Error al guardar jugador:", err);
        alert("Ocurrió un error al guardar el jugador");
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


<style scoped></style>
