<template>
  <v-app>
    <v-main>
      <v-container>

        <!-- BOTÓN + TÍTULO -->
        <div class="d-flex align-center mb-6">
          <v-btn color="grey" variant="outlined" @click="$router.push('/players_crud_list')">
            ← Regresar
          </v-btn>

          <h1 class="text-h4 font-weight-bold ml-4">Gestión de Jugadores</h1>
        </div>

        <!-- FORMULARIO -->
        <v-card elevation="8" class="pa-4 mb-6">
          <h3 class="text-h6 font-weight-bold mb-4">
            {{ editMode ? "Editar Jugador" : "Agregar Jugador" }}
          </h3>

          <v-form @submit.prevent="savePlayer">
            <v-text-field v-model="form.Nombre" label="Nombre" prepend-inner-icon="mdi-account" required />
            <v-text-field v-model="form.Apellido_Paterno" label="Apellido" prepend-inner-icon="mdi-account-outline" required />
            <v-text-field v-model="form.Posicion" label="Posición" prepend-inner-icon="mdi-basketball" required />
            <v-text-field v-model="form.Numero" label="Número" type="number" prepend-inner-icon="mdi-pound" required />

            <!-- IMAGEN BASE64 -->
            <v-text-field v-model="form.imagenURL" label="Imagen Base64" prepend-inner-icon="mdi-image" />

            <div class="mt-3 text-center">
              <v-avatar size="80" v-if="form.imagenURL">
                <img :src="`data:image/png;base64,${form.imagenURL}`" />
              </v-avatar>
            </div>

            <!-- SELECT EQUIPO -->
            <v-select
              v-model="form.EquipoId"
              :items="equipos"
              item-title="Nombre"
              item-value="Id"
              label="Selecciona un Equipo"
              prepend-inner-icon="mdi-shield"
              required
              class="mt-4"
            />

            <v-btn type="submit" color="primary" class="mt-4">
              {{ editMode ? "Guardar Cambios" : "Agregar" }}
            </v-btn>

            <v-btn v-if="editMode" class="mt-4 ml-3" color="grey" @click="cancelEdit">
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
import { useJugadoresStore } from "@/stores/JugadoresStore";
import { mapActions } from "pinia";

export default {
  name: "PlayersCRUD",

  setup() {
    const jugadoresStore = useJugadoresStore();
    return { jugadoresStore };
  },

  data() {
    return {
      equipos: [],

      form: {
        Id: 0,
        Nombre: "",
        Apellido_Paterno: "",
        Posicion: "",
        Numero: "",
        imagenURL: "",
        EquipoId: 0
      },

      editMode: false
    };
  },

  async mounted() {
    // Cargar equipos
    const resEquipos = await axios.get("http://localhost:49986/ApiLiga/Obtener/Equipos");
    this.equipos = resEquipos.data;

    // Obtener ID por query
    const id = this.$route.query.id;

    if (id) {
      this.editMode = true;

      // CARGAR EL JUGADOR DESDE EL STORE
      let jugador = await this.jugadoresStore.fetchById(parseInt(id));

      // Tu endpoint regresa un array, así que tomamos el índice 0
      if (Array.isArray(jugador)) jugador = jugador[0];

      if (jugador) {
        this.form = { ...jugador };
      }
    }
  },

  methods: {
    ...mapActions(useJugadoresStore, ["create", "update"]),

    async savePlayer() {
      if (this.editMode) {
        await this.update(this.form);
        alert("Jugador actualizado");
      } else {
        await this.create(this.form);
        alert("Jugador agregado");
      }

      this.$router.push("/players_crud_list");
    },

    cancelEdit() {
      this.$router.push("/players_crud_list");
    }
  }
};
</script>

<style scoped></style>
