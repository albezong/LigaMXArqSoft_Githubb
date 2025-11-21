<template>
  <v-app>
    <v-main>

      <!-- Pantalla de carga -->
      <div v-if="loading" class="loading-container">
        <v-progress-circular indeterminate size="70" width="6"></v-progress-circular>
        <p class="mt-4 text-h6">Cargando equipos...</p>
      </div>

      <!-- Vista principal -->
      <v-container v-else class="py-10">

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
            <v-card
              elevation="8"
              class="team-card pa-4"
            >

              <!-- Logo -->
              <div class="d-flex justify-center mb-4">
                <v-img
                  :src="getLogo(team.Nombre)"
                  width="90"
                  height="90"
                  class="rounded-circle logo-shadow"
                  cover
                />
              </div>

              <!-- Nombre -->
              <h3 class="text-h6 text-center font-weight-bold mb-1">
                {{ team.Nombre }}
              </h3>

              <!-- Ciudad -->
              <p class="text-center text-caption mb-4">
                {{ team.Ciudad }}
              </p>

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
const loading = ref(true)

// Diccionario de logos (nombre → archivo)
const logos = {
  bulls: "/img/bulls.jpeg",
  celtics: "/img/celtics.jpeg",
  raptors: "/img/raptors.jpeg",
  warriors: "/img/warriors.jpeg",
  wolves: "/img/wolves.jpeg"
}

// Logo por defecto
const defaultLogo = "/img/LogoBBMX.jpeg"

// Obtener logo según nombre
function getLogo(nombre) {
  const key = nombre.toLowerCase()
  return logos[key] || defaultLogo
}

async function cargarEquipos() {
  try {
    const resp = await axios.get('http://localhost:49986/ApiLiga/Obtener/equipos')
    teams.value = resp.data
  } catch (err) {
    console.error('Error cargando equipos:', err)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 600) // para que se note la animación
  }
}

onMounted(() => {
  cargarEquipos()
})
</script>

<style scoped>
/* Pantalla de carga */
.loading-container {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Tarjetas modernas */
.team-card {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.team-card:hover {
  transform: translateY(-6px);
  box-shadow: 0px 6px 20px rgba(0,0,0,0.20);
}

/* Sombra al logo */
.logo-shadow {
  border-radius: 50%;
  box-shadow: 0px 4px 14px rgba(0,0,0,0.25);
}
</style>
