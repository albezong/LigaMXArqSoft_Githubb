<template>
  <v-app>
    <v-main>
      <v-container class="py-10">

        <!-- DIÁLOGO -->
        <v-dialog v-model="dialog" max-width="500" persistent>
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


            <!-- ========================== -->
            <!--      JUGADORES LISTA       -->
            <!-- ========================== -->
            <h3 class="mt-6 text-h6 font-weight-bold">Jugadores del equipo</h3>

            <!-- BOTÓN AGREGAR -->
            <div class="d-flex justify-end mb-4">
              <v-btn color="green" @click="$router.push('/players_crud_add')">
                Agregar Jugador
              </v-btn>
            </div>

            <div v-if="jugadores.length === 0">
              <p class="text-caption">Este equipo no tiene jugadores registrados.</p>
            </div>

            <v-list v-else>
              <v-list-item
                v-for="j in jugadores"
                :key="j.Id"
              >
                <v-list-item-title>
                  {{ j.Nombre }} {{ j.Apellido_Paterno }}
                </v-list-item-title>

                <template #append>
                  <v-btn icon @click="editarJugador(j.Id)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn icon color="red" @click="eliminarJugador(j.Id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>


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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useEquiposStore } from "@/stores/EquiposStore";
import { useJugadoresStore } from "@/stores/JugadoresStore"; // ← IMPORTANTE
import { obtenerJugadoresPorEquipo } from "@/services/JugadoresService";

const route = useRoute();
const equiposStore = useEquiposStore();
const jugadoresStore = useJugadoresStore(); // ← IMPORTANTE

const dialog = ref(false);
const modoEdicion = ref(false);

const jugadores = ref([]);

const equipoId = Number(route.query.id);

const form = ref({
  Id: 0,
  Nombre: "",
  Ciudad: "",
  UsuarioId: 0
});

// =====================================
//      Cargar jugadores del equipo
// =====================================
async function cargarJugadoresEquipo(id) {
  jugadores.value = await obtenerJugadoresPorEquipo(id);
  console.log("Jugadores cargados:", jugadores.value);
}

// =====================================
//              MONTAJE
// =====================================
onMounted(async () => {
  await equiposStore.fetchAll();

  if (equipoId) {
    const equipo = equiposStore.equipos.find(e => e.Id === equipoId);

    if (equipo) {
      form.value = { ...equipo };
      modoEdicion.value = true;
      dialog.value = true;

      cargarJugadoresEquipo(equipoId);
    }
  }
});

// =====================================
//              CRUD
// =====================================
function cerrarDialog() {
  dialog.value = false;
}

async function guardarEquipo() {
  if (!form.value.Nombre || !form.value.Ciudad) {
    return alert("Por favor completa todos los campos.");
  }

  if (modoEdicion.value) {
    await equiposStore.update(form.value);
  } else {
    await equiposStore.create(form.value);
  }

  dialog.value = false;
}

function abrirNuevo() {
  modoEdicion.value = false;
  form.value = { Id: 0, Nombre: "", Ciudad: "", UsuarioId: 0 };
  dialog.value = true;
}

function abrirEditar(id) {
  const equipo = equiposStore.equipos.find(e => e.Id === id);
  if (!equipo) return alert("Equipo no encontrado");

  form.value = { ...equipo };
  modoEdicion.value = true;
  dialog.value = true;

  cargarJugadoresEquipo(id);
}

// =====================================
//            ELIMINAR JUGADOR
// =====================================
async function eliminarJugador(id) {
  if (!confirm("¿Eliminar jugador?")) return;

  await jugadoresStore.remove(id); // ← MISMO DELETE DEL LISTADO

  await cargarJugadoresEquipo(equipoId); // ← REFRESCA LA LISTA
}

// =====================================
//          EDITAR JUGADOR
// =====================================
function editarJugador(id) {
  window.location.href = `/players_crud_edit?id=${id}`;
}
</script>



<style>
/* (tu CSS igual) */
</style>
