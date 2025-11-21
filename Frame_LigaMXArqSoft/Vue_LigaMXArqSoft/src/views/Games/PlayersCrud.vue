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

        <!-- TABLA DE JUGADORES -->
        <v-card elevation="8" class="pa-4">
          <h3 class="text-h6 font-weight-bold mb-4">Lista de Jugadores</h3>

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
              <tr v-for="(player, index) in players" :key="index">

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
                  <v-btn
                    size="small"
                    color="blue"
                    class="mr-2"
                    @click="editPlayer(index)"
                  >
                    Editar
                  </v-btn>

                  <v-btn
                    size="small"
                    color="red"
                    @click="deletePlayer(index)"
                  >
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
export default {
  name: "PlayersCRUD",

  data() {
    return {
      // LISTA DE JUGADORES INICIALES
      players: [
        {
          nombre: "Stephen",
          apellido: "Curry",
          posicion: "Base",
          numero: 30,
          imagen: "/img/warriors.jpeg"
        },
        {
          nombre: "Zach",
          apellido: "LaVine",
          posicion: "Escolta",
          numero: 8,
          imagen: "/img/bulls.jpeg"
        }
      ],

      // FORMULARIO
      form: {
        nombre: "",
        apellido: "",
        posicion: "",
        numero: "",
        imagen: ""
      },

      editIndex: -1
    };
  },

  methods: {
    savePlayer() {
      if (
        !this.form.nombre ||
        !this.form.apellido ||
        !this.form.posicion ||
        !this.form.numero ||
        !this.form.imagen
      )
        return;

      if (this.editIndex === -1) {
        // AGREGAR
        this.players.push({ ...this.form });
      } else {
        // EDITAR
        this.players.splice(this.editIndex, 1, { ...this.form });
      }

      this.resetForm();
    },

    editPlayer(index) {
      this.editIndex = index;
      this.form = { ...this.players[index] };
    },

    deletePlayer(index) {
      this.players.splice(index, 1);
    },

    cancelEdit() {
      this.resetForm();
    },

    resetForm() {
      this.form = {
        nombre: "",
        apellido: "",
        posicion: "",
        numero: "",
        imagen: ""
      };
      this.editIndex = -1;
    }
  }
};
</script>

<style scoped>
</style>