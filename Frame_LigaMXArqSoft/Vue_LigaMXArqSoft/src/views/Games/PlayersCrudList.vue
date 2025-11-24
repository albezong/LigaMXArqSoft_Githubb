<template>
  <v-app>
    <v-main>
      <v-container>

        <h1 class="text-h4 font-weight-bold mb-6">Lista de Jugadores</h1>

        <!-- BOTÓN AGREGAR JUGADOR -->
        <div class="d-flex justify-end mb-4">
          <v-btn color="green" @click="$router.push('/players_crud_add')">
            Agregar Jugador
          </v-btn>
        </div>

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
              <tr v-for="player in jugadores" :key="player.Id">

                <!-- IMAGEN -->
                <td>
                  <v-avatar size="45">
                    <img :src="`data:image/png;base64,${player.imagenURL}`" alt="jugador" />
                  </v-avatar>
                </td>

                <!-- NOMBRE -->
                <td>{{ player.Nombre }}</td>

                <!-- APELLIDO -->
                <td>{{ player.Apellido_Paterno }}</td>

                <!-- POSICIÓN -->
                <td>{{ player.Posicion }}</td>

                <!-- NÚMERO -->
                <td>{{ player.Numero }}</td>

                <!-- ACCIONES -->
                <td class="text-center">
                  <v-btn size="small" color="blue" variant="outlined" class="mr-2" @click="goToEdit(player.Id)">
                    Editar
                  </v-btn>

                  <v-btn size="small" color="red" @click="deletePlayer(player.Id)">
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
  name: "PlayersList",

  computed: {
    ...mapState(useJugadoresStore, ["jugadores", "loading"])
  },

  created() {
    this.fetchAll(); // cargar jugadores al abrir la vista
  },

  methods: {
    ...mapActions(useJugadoresStore, ["fetchAll", "remove"]),

    goToEdit(id) {
      this.$router.push(`/players_crud_add?id=${id}`);
    },

    async deletePlayer(id) {
      if (!confirm("¿Eliminar jugador?")) return;

      await this.remove(id);
      await this.fetchAll(); // refrescar tabla
    }
  }
};
</script>


<style scoped></style>
