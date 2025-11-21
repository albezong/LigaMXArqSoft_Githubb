<template>
  <v-app>
    <v-main>
      <v-container>

        <h1 class="text-h4 font-weight-bold mb-6">Gestión de Equipos</h1>

        <!-- FORMULARIO PARA AÑADIR / EDITAR -->
        <v-card elevation="8" class="pa-4 mb-6">
          <h3 class="text-h6 font-weight-bold mb-4">
            {{ editIndex === -1 ? "Agregar Equipo" : "Editar Equipo" }}
          </h3>

          <v-form @submit.prevent="saveTeam">

            <v-text-field
              v-model="form.city"
              label="Ciudad"
              prepend-inner-icon="mdi-city"
              required
            />

            <v-text-field
              v-model="form.team"
              label="Equipo"
              prepend-inner-icon="mdi-basketball"
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

        <!-- TABLA DE EQUIPOS -->
        <v-card elevation="8" class="pa-4">
          <h3 class="text-h6 font-weight-bold mb-4">Lista de Equipos</h3>

          <v-table>
            <thead>
              <tr>
                <th>Ciudad</th>
                <th>Equipo</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(team, index) in teams" :key="index">
                <td>{{ team.city }}</td>
                <td>{{ team.team }}</td>

                <td class="text-center">
                  <v-btn
                    size="small"
                    color="blue"
                    @click="editTeam(index)"
                    class="mr-2"
                  >
                    Editar
                  </v-btn>

                  <v-btn
                    size="small"
                    color="red"
                    @click="deleteTeam(index)"
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
  name: "TeamsCRUD",

  data() {
    return {
      // LISTA DE EQUIPOS
      teams: [
        { city: "Boston", team: "Celtics" },
        { city: "Toronto", team: "Raptors" },
        { city: "Chicago", team: "Bulls" },
        { city: "San Francisco", team: "Warriors" },
        { city: "Minnesota", team: "Wolves" }
      ],

      // FORMULARIO
      form: {
        city: "",
        team: ""
      },

      editIndex: -1
    };
  },

  methods: {
    saveTeam() {
      if (!this.form.city || !this.form.team) return;

      // AGREGAR
      if (this.editIndex === -1) {
        this.teams.push({
          city: this.form.city,
          team: this.form.team
        });
      }
      // EDITAR
      else {
        this.teams[this.editIndex].city = this.form.city;
        this.teams[this.editIndex].team = this.form.team;
      }

      this.resetForm();
    },

    deleteTeam(index) {
      this.teams.splice(index, 1);
    },

    editTeam(index) {
      this.editIndex = index;
      this.form.city = this.teams[index].city;
      this.form.team = this.teams[index].team;
    },

    cancelEdit() {
      this.resetForm();
    },

    resetForm() {
      this.form.city = "";
      this.form.team = "";
      this.editIndex = -1;
    }
  }
};
</script>

<style scoped>
</style>