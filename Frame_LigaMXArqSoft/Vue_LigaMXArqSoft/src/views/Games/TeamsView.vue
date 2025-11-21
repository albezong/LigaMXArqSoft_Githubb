<template>
  <v-app>
    <v-main>
      <v-container class="py-10">

        <h2 class="text-h4 font-weight-bold mb-6">Equipos</h2>

        <v-row dense>
          <v-col
            v-for="team in teams"
            :key="team.Id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card elevation="6" class="pa-4">

              <!-- Avatar provisional -->
              <div class="d-flex justify-center mb-4">
                <v-avatar size="50" color="grey lighten-2">
                  <span class="text-h6">
                    {{ team.Nombre.charAt(0) }}
                  </span>
                </v-avatar>
              </div>

              <!-- Nombre -->
              <h3 class="text-h6 text-center font-weight-bold mb-1">
                {{ team.Nombre }}
              </h3>

              <!-- Ciudad -->
              <p class="text-center text-caption mb-4">
                {{ team.Ciudad }}
              </p>

              <!-- Botones -->
              <div class="d-flex justify-center">
                <v-btn small color="primary" class="mx-1" :href="`/equipos/${team.Id}`">
                  Perfil
                </v-btn>

                <v-btn small color="blue darken-2" class="mx-1" @click="editTeam(team)">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>

                <v-btn small color="red darken-2" class="mx-1" @click="deleteTeam(team)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>

            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const teams = ref([])

async function cargarEquipos() {
  try {
    const resp = await axios.get('http://localhost:49986/ApiLiga/Obtener/equipos')
    teams.value = resp.data
  } catch (err) {
    console.error('Error cargando equipos:', err)
  }
}

function editTeam(team) {
  // Aquí puedes navegar a la vista Update
  // router.push(`/equipos/editar/${team.Id}`)
  alert("Editar equipo: " + team.Nombre)
}

function deleteTeam(team) {
  if (confirm(`¿Eliminar equipo ${team.Nombre}?`)) {
    alert("Equipo eliminado.")
    // Aquí puedes llamar tu endpoint DELETE si existe
  }
}

onMounted(() => {
  cargarEquipos()
})
</script>
