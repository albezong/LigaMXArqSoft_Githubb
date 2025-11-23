<template>
  <v-app>
    <v-main>
      <v-container>

        <h1 class="text-h4 font-weight-bold mb-6">Lista de Jugadores</h1>

        <v-card elevation="8" class="pa-4">

          <!-- TABLA DE JUGADORES -->
          <v-table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Posición</th>
                <th>Número</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(player, index) in jugadores" :key="index">

                <td>
                  <v-avatar size="45">
                    <img :src="player.imagen" alt="jugador" />
                  </v-avatar>
                </td>

                <td>{{ player.nombre }}</td>
                <td>{{ player.apellido }}</td>
                <td>{{ player.posicion }}</td>
                <td>{{ player.numero }}</td>

                <td class="text-center">
                  <v-btn size="small" color="blue" variant="outlined"
                    class="mr-2"
                    @click="editPlayer(player)">
                    Editar
                  </v-btn>

                  <v-btn size="small" color="red"
                    @click="deletePlayer(player.id)">
                    Eliminar
                  </v-btn>
                </td>

              </tr>
            </tbody>
          </v-table>

        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { useJugadoresStore } from "@/stores/JugadoresStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "PlayersCRUD",

  data() {
    return {
      form: {
        id: 0,
        nombre: "",
        apellido: "",
        posicion: "",
        numero: "",
        imagen: "",
        equipoId: 0
      },
      editMode: false
    };
  },

  computed: {
    ...mapState(useJugadoresStore, ["jugadores", "loading"])
  },

  created() {
    this.fetchAll(); // cargar jugadores al abrir la vista
  },

  methods: {
    ...mapActions(useJugadoresStore, [
      "fetchAll",
      "create",
      "update",
      "remove"
    ]),

    editPlayer(player) {
      this.editMode = true;
      this.form = { ...player };
    },

    async deletePlayer(id) {
      if (!confirm("¿Eliminar jugador?")) return;

      await this.remove(id);
    },

    async savePlayer() {
      if (this.editMode) {
        await this.update(this.form);
      } else {
        await this.create(this.form);
      }

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
      this.editMode = false;
    }
  }
};
</script>

<style scoped>
</style>
