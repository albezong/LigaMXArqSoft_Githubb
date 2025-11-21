<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ID del equipo a editar (puede venir de route params)
const equipoId = 7

// Endpoints
const endpointGet = `http://localhost:49986/ApiLiga/Equipo/${equipoId}`
const endpointUpdate = `http://localhost:49986/ApiLiga/Actualizar/Equipo/${equipoId}`

// Modelo base
const equipo = ref({
  Id: 0,
  Nombre: '',
  Ciudad: '',
  UsuarioId: 0
})

const mensaje = ref('')
const cargando = ref(false)

// Obtener datos del equipo
async function cargarEquipo() {
  cargando.value = true
  try {
    const resp = await axios.get(endpointGet)
    equipo.value = resp.data
  } catch (err) {
    mensaje.value = 'No se pudo cargar la información del equipo.'
  } finally {
    cargando.value = false
  }
}

// Actualizar datos del equipo
async function actualizarEquipo() {
  cargando.value = true
  mensaje.value = ''
  try {
    await axios.put(endpointUpdate, equipo.value, {
      headers: { 'Content-Type': 'application/json' }
    })
    mensaje.value = 'Equipo actualizado correctamente.'
  } catch (err) {
    mensaje.value = 'Ocurrió un error al actualizar.'
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  cargarEquipo()
})
</script>

<template>
  <div class="p-4">
    <h2>Actualizar Equipo</h2>

    <div v-if="cargando">Cargando...</div>

    <div v-else>
      <div class="mb-3">
        <label>Nombre</label>
        <input v-model="equipo.Nombre" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Ciudad</label>
        <input v-model="equipo.Ciudad" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Usuario ID</label>
        <input type="number" v-model="equipo.UsuarioId" class="form-control" />
      </div>

      <button class="btn btn-primary" @click="actualizarEquipo">
        Guardar Cambios
      </button>

      <p class="mt-3">{{ mensaje }}</p>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn {
  padding: 8px 20px;
}
</style>
