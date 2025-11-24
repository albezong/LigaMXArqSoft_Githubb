<template>
  <v-app>
    <v-main>
      <v-container class="py-10">

        <!-- TÍTULO + BOTÓN NUEVO -->
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h4 font-weight-bold">Equipos</h2>

          <v-btn color="green-darken-1" prepend-icon="mdi-plus" @click="abrirNuevo">
            Nuevo Equipo
          </v-btn>
        </div>

        <!-- GRID DE TARJETAS -->
        <v-row class="g-4">
          <v-col
            v-for="team in teams"
            :key="team.Id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              :elevation="hover === team.Id ? 14 : 8"
              class="pa-4 team-card"
              @mouseenter="hover = team.Id"
              @mouseleave="hover = null"
            >
              <div class="team-id">#{{ team.Id }}</div>

              <!-- AVATAR -->
              <div class="d-flex justify-center mb-4">
                <v-avatar
                  size="56"
                  class="white--text"
                  :color="stringToColor(team.Nombre)"
                >
                  {{ team.Nombre?.charAt(0) }}
                </v-avatar>
              </div>

              <!-- NOMBRE -->
              <v-card-title class="team-name">
                {{ team.Nombre }}
              </v-card-title>

              <!-- CIUDAD EN CHIP -->
              <v-card-text class="text-center">
                <v-chip
                  color="blue-grey lighten-4"
                  size="small"
                  class="text-body-2"
                >
                  {{ team.Ciudad }}
                </v-chip>
              </v-card-text>

              <!-- BOTONES -->
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="blue-darken-2"
                  @click="abrirEditar(team.Id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="red-darken-2"
                  @click="eliminarEquipo(team.Id, team.Nombre)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- DIÁLOGO -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card class="pa-6 rounded-xl">

            <h3 class="text-h6 font-weight-bold mb-6">
              {{ modoEdicion ? "Editar Equipo" : "Nuevo Equipo" }}
            </h3>

            <v-text-field
              label="Nombre"
              v-model="form.Nombre"
              variant="outlined"
              class="mb-3"
            />

            <v-text-field
              label="Ciudad"
              v-model="form.Ciudad"
              variant="outlined"
              class="mb-3"
            />

            <v-text-field
              label="Usuario ID"
              type="number"
              v-model="form.UsuarioId"
              variant="outlined"
              class="mb-3"
            />

            <!-- BOTONES -->
            <v-card-actions class="d-flex justify-end mt-4">
              <v-btn variant="text" color="grey-darken-1" @click="cerrarDialog">
                Cancelar
              </v-btn>

              <v-btn color="green-darken-1" @click="guardarEquipo">
                Guardar
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>

      </v-container>
    </v-main>
  </v-app>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const teams = ref([])
const dialog = ref(false)
const modoEdicion = ref(false)
const hover = ref(null)

const form = ref({
  Id: 0,
  Nombre: "",
  Ciudad: "",
  UsuarioId: 0
})

/* COLORES DINÁMICOS */
function stringToColor(str) {
  if (!str) return "grey"
  const colors = [
    "deep-purple", "indigo", "blue",
    "teal", "green", "orange", "red"
  ]
  return colors[str.length % colors.length] + " lighten-1"
}

/* CARGAR EQUIPOS */
async function cargarEquipos() {
  const { data } = await axios.get("http://localhost:49986/ApiLiga/Obtener/Equipos")
  teams.value = data
}

/* ABRIR NUEVO */
function abrirNuevo() {
  modoEdicion.value = false
  form.value = { Id: 0, Nombre: "", Ciudad: "", UsuarioId: 0 }
  dialog.value = true
}

/* ABRIR EDITAR */
async function abrirEditar(id) {
  const { data } = await axios.get(`http://localhost:49986/ApiLiga/Obtener/EquiposById?id=${id}`)
  form.value = { ...data }
  modoEdicion.value = true
  dialog.value = true
}

/* GUARDAR */
async function guardarEquipo() {
  if (modoEdicion.value) {
    await axios.put(
      `http://localhost:49986/ApiLiga/Actualizar/Equipo/${form.value.Id}`,
      form.value
    )
  } else {
    await axios.post(
      "http://localhost:49986/ApiLiga/Insertar/Equipo",
      form.value
    )
  }

  dialog.value = false
  cargarEquipos()
}

/* ELIMINAR */
async function eliminarEquipo(id, nombre) {
  if (!confirm(`¿Eliminar el equipo ${nombre}?`)) return;
  await axios.delete(`http://localhost:49986/ApiLiga/Eliminar/Equipo/${id}`)
  cargarEquipos()
}

function cerrarDialog() {
  dialog.value = false
}

onMounted(cargarEquipos)
</script>


<!-- ESTILOS -->
<style>
/* -------- TIPOGRAFÍA DEPORTIVA -------- */
.team-card h3,
.team-name,
.v-btn,
strong {
  font-family: "Anton", sans-serif !important;
  letter-spacing: 1px;
}

/* -------- CARD DEPORTIVO -------- */
.team-card {
  border-radius: 18px !important;
  border: 3px solid #00000020 !important;
  transition: transform .2s ease, box-shadow .2s ease;
  position: relative;
}

.team-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 6px 18px #00000040 !important;
}

/* -------- ID EN LA ESQUINA -------- */
.team-id {
  position: absolute;
  top: 6px;
  right: 10px;
  background: #ff3d0015;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: bold;
  font-family: "Anton", sans-serif !important;
  color: #ff3d00;
}

/* -------- NOMBRE CENTRADO Y DEPORTIVO -------- */
.team-name {
  text-align: center;
  font-size: 1.3rem;
  font-family: "Anton", sans-serif !important;
  letter-spacing: 1px;
  font-weight: bold !important;
}

/* -------- CHIP -------- */
.v-chip {
  font-family: "Anton", sans-serif !important;
  letter-spacing: 1px;
  font-size: 0.85rem !important;
}

/* -------- BOTONES -------- */
.team-card .v-btn {
  font-family: "Anton", sans-serif !important;
  font-weight: bold !important;
  transition: transform .15s ease;
}

.v-btn:hover {
  transform: translateY(-2px);
}

.v-btn:active {
  transform: translateY(2px);
}

</style>
