<template>
  <v-app>
    <v-main>
      <v-container class="py-10">

        <!-- TÍTULO -->
        <h2 class="text-h4 font-weight-bold mb-6">Equipos</h2>

        <!-- BOTÓN NUEVO -->
        <v-btn color="green" class="mb-6" @click="abrirNuevo">
          Nuevo Equipo
        </v-btn>

        <!-- LISTA DE TARJETAS -->
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

              <!-- AVATAR -->
              <div class="d-flex justify-center mb-4">
                <v-avatar size="50" color="grey lighten-2">
                  <span class="text-h6">
                    {{ team.Nombre?.charAt(0) }}
                  </span>
                </v-avatar>
              </div>

              <!-- NOMBRE -->
              <h3 class="text-h6 text-center font-weight-bold mb-1">
                {{ team.Nombre }}
              </h3>

              <!-- CIUDAD -->
              <p class="text-center text-caption mb-4">
                {{ team.Ciudad }}
              </p>

              <!-- BOTONES -->
              <div class="d-flex justify-center">
                <v-btn small color="blue darken-2" class="mx-1" @click="abrirEditar(team.Id)">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>

                <v-btn small color="red darken-2" class="mx-1" @click="eliminarEquipo(team.Id, team.Nombre)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>

            </v-card>
          </v-col>
        </v-row>

        <!-- FORMULARIO EN DIÁLOGO -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card class="pa-4">

            <h3 class="text-h6 font-weight-bold mb-4">
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

            <v-card-actions class="d-flex justify-end">
              <v-btn color="grey" @click="cerrarDialog">Cancelar</v-btn>
              <v-btn color="green" @click="guardarEquipo">Guardar</v-btn>
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

const form = ref({
  Id: 0,
  Nombre: "",
  Ciudad: "",
  UsuarioId: 0
})

/* ─────────────────────────────────────────────
   CARGAR EQUIPOS
───────────────────────────────────────────────*/
async function cargarEquipos() {
  const { data } = await axios.get("http://localhost:49986/ApiLiga/Obtener/Equipos")
  teams.value = data
}

/* ─────────────────────────────────────────────
   ABRIR NUEVO
───────────────────────────────────────────────*/
function abrirNuevo() {
  modoEdicion.value = false
  form.value = { Id: 0, Nombre: "", Ciudad: "", UsuarioId: 0 }
  dialog.value = true
}

/* ─────────────────────────────────────────────
   ABRIR EDITAR
───────────────────────────────────────────────*/
async function abrirEditar(id) {
  const { data } = await axios.get(`http://localhost:49986/ApiLiga/Obtener/EquiposById?id=${id}`)
  form.value = { ...data }
  modoEdicion.value = true
  dialog.value = true
}

/* ─────────────────────────────────────────────
   GUARDAR
───────────────────────────────────────────────*/
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

/* ─────────────────────────────────────────────
   ELIMINAR
───────────────────────────────────────────────*/
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
