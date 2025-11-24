<template>
  <v-app>
    <v-main>
      <v-container class="mt-10">
        
        <!-- TÍTULO -->
        <h1 class="text-center mb-8" style="font-family:'Anton'; letter-spacing:2px;">
          🏀 Gestión de Partidos
        </h1>

        <!-- CARD FORMULARIO -->
        <v-card
        class="pa-6 mb-8 form-card"
        elevation="12"
        style="
            border-radius: 18px;
            background: linear-gradient(135deg, #ff8c00, #ff3d00);
            color: white;
        "
        >
          <h2 class="text-center mb-4" style="font-family:'Anton';">Agregar / Editar Partido</h2>

          <v-row dense>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="partido.Fecha"
                label="Fecha"
                type="datetime-local"
                variant="solo"
                prepend-inner-icon="mdi-calendar"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="partido.Equipolocal"
                label="Equipo Local (ID)"
                type="number"
                variant="solo"
                prepend-inner-icon="mdi-home"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="partido.EquipoVisitante"
                label="Equipo Visitante (ID)"
                type="number"
                variant="solo"
                prepend-inner-icon="mdi-airplane"
              />
            </v-col>

            <v-col cols="6" sm="3">
              <v-text-field
                v-model="partido.PuntosLocal"
                label="Puntos Local"
                type="number"
                variant="solo"
                prepend-inner-icon="mdi-numeric"
              />
            </v-col>

            <v-col cols="6" sm="3">
              <v-text-field
                v-model="partido.PuntosVisitante"
                label="Puntos Visitante"
                type="number"
                variant="solo"
                prepend-inner-icon="mdi-numeric"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-switch
                v-model="partido.Status_Jugado"
                label="¿Partido jugado?"
                inset
                color="black"
              />
            </v-col>
          </v-row>

          <v-btn
            block
            color="black"
            class="mt-4 py-4"
            style="border-radius: 12px;"
            @click="partido.Id ? actualizarPartido() : insertarPartido()"
          >
            {{ partido.Id ? "Actualizar Partido" : "Insertar Partido" }}
          </v-btn>
        </v-card>

        <!-- LISTADO DE PARTIDOS -->
        <v-card elevation="10" class="pa-6">
          <h2 class="text-center mb-4" style="font-family:'Anton'; letter-spacing:1px;">
            Partidos Registrados
          </h2>

          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="game in partidos"
              :key="game.Id"
            >
              <v-card elevation="8" class="pa-4" style="border-radius:18px;">
                <h3 class="text-center font-weight-bold">Partido #{{ game.Id }}</h3>
                <p class="text-center">{{ formatFecha(game.Fecha) }}</p>

                <v-divider class="my-2"></v-divider>

                <p class="partido-info">
                <strong>Local:</strong> {{ game.Equipolocal }} ({{ game.PuntosLocal }} pts)
                </p>

                <p class="partido-info">
                <strong>Visitante:</strong> {{ game.EquipoVisitante }} ({{ game.PuntosVisitante }} pts)
                </p>

                <p class="partido-info">
                <strong>Estado:</strong> {{ game.Status_Jugado ? "Jugado" : "Pendiente" }}
                </p>

                <v-btn
                  block
                  color="orange"
                  class="mt-2"
                  @click="cargarPartido(game)"
                >
                  Editar
                </v-btn>

                <v-btn
                  block
                  color="red"
                  class="mt-2"
                  @click="eliminarPartido(game.Id)"
                >
                  Eliminar
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "PartidosCrudView",
  data() {
    return {
      partidos: [],
      partido: {
        Id: 0,
        Fecha: "",
        Equipolocal: 0,
        EquipoVisitante: 0,
        PuntosLocal: 0,
        PuntosVisitante: 0,
        Status_Jugado: false
      }
    };
  },

  mounted() {
    this.obtenerPartidos();
  },

  methods: {
    // ---- OBTENER TODOS ----
    async obtenerPartidos() {
      const res = await fetch("http://localhost:49986/APiLiga/Obtener/Partidos");
      this.partidos = await res.json();
    },

    // ---- INSERTAR ----
    async insertarPartido() {
      await fetch("http://localhost:49986/APiLiga/Insertar/Partidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.partido)
      });

      alert("Partido insertado 🏀🔥");
      this.limpiarFormulario();
      this.obtenerPartidos();
    },

    // ---- CARGAR PARA EDITAR ----
    cargarPartido(data) {
      this.partido = { ...data };
    },

    // ---- ACTUALIZAR ----
    async actualizarPartido() {
      await fetch(
        `http://localhost:49986/APiLiga/Actualizar/Partido/${this.partido.Id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.partido)
        }
      );

      alert("Partido actualizado 🏀👌");
      this.limpiarFormulario();
      this.obtenerPartidos();
    },

    // ---- ELIMINAR ----
    async eliminarPartido(id) {
      if (!confirm("¿Deseas eliminar este partido?")) return;

      await fetch(`http://localhost:49986/APiLiga/Eliminar/partido/${id}`, {
        method: "DELETE"
      });

      alert("Partido eliminado ❌");
      this.obtenerPartidos();
    },

    // ---- LIMPIAR ----
    limpiarFormulario() {
      this.partido = {
        Id: 0,
        Fecha: "",
        Equipolocal: 0,
        EquipoVisitante: 0,
        PuntosLocal: 0,
        PuntosVisitante: 0,
        Status_Jugado: false
      };
    },

    // ---- FORMATEAR FECHA ----
    formatFecha(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  }
};
</script>

<style scoped>
/* ------------ TIPOGRAFÍA PRINCIPAL ------------ */
h1, h2, h3,
.card-title,
.text-center,
strong,
.v-btn,
label {
  font-family: "Anton", sans-serif !important;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ------------ TÍTULOS PRINCIPALES ------------ */
h1 {
  font-size: 42px;
  font-weight: bold;
  text-shadow: 3px 3px 0 #00000050;
}

/* ------------ SUBTÍTULOS ------------ */
h2 {
  font-size: 28px;
  text-shadow: 2px 2px 0 #00000040;
}

/* ------------ CARDS DE PARTIDOS ------------ */
.v-card {
  border-radius: 18px !important;
  border: 3px solid #00000015;
  transition: transform .2s ease, box-shadow .2s ease;
}

.v-card:hover {
  transform: scale(1.03);
  box-shadow: 0px 6px 18px #00000040 !important;
}

/* ------------ SEPARADOR ENTRE DATOS ------------ */
.v-divider {
  border-width: 2px !important;
  border-color: #ff3d00 !important;
  opacity: 1 !important;
}

/* ------------ TEXTOS DE PARTIDO ------------ */
.partido-info {
  font-size: 18px;
  font-family: "Anton", sans-serif;
  letter-spacing: 1px;
  margin: 4px 0;
}

/* ------------ BOTONES ESTILO "SCOREBOARD" ------------ */
.v-btn {
  font-size: 16px !important;
  font-weight: bold !important;
  border-radius: 14px !important;
  padding: 12px !important;
  box-shadow: 0 4px 0 #00000060 !important;
  transition: transform .15s ease;
}

.v-btn:hover {
  transform: translateY(-2px);
}

.v-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #00000040 !important;
}

/* ------------ COLORACIÓN DEPORTIVA ------------ */
.v-btn[color="orange"] {
  background: linear-gradient(to bottom, #ff9800, #e65100) !important;
  color: white !important;
}

.v-btn[color="red"] {
  background: linear-gradient(to bottom, #ff3b3b, #b71c1c) !important;
  color: white !important;
}

.v-btn[color="black"] {
  background: linear-gradient(to bottom, #212121, #000) !important;
  color: white !important;
}

/* ------------ FORMULARIO GRADIENTE ------------ */
.form-card {
  background: linear-gradient(135deg, #ff8c00, #ff3d00) !important;
  border: 3px solid #00000030 !important;
  box-shadow: 0 6px 14px #00000040 !important;
}

</style>