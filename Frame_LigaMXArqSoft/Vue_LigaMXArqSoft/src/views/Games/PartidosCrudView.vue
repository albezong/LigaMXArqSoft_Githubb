<template>
  <v-app>
    <v-main>
      <v-container class="mt-10">

        <!-- TÍTULO -->
        <h1 class="text-center mb-8" style="font-family:'Anton'; letter-spacing:2px;">
          🏀 Gestión de Partidos
        </h1>

        <!-- CARD FORMULARIO -->
        <v-card class="pa-6 mb-8 form-card" elevation="12" style="
            border-radius: 18px;
            background: linear-gradient(135deg, #ff8c00, #ff3d00);
            color: white;
        ">
          <h2 class="text-center mb-4" style="font-family:'Anton';">Agregar / Editar Partido</h2>

          <v-row dense>
            <!-- FECHA (picker) -->
            <v-col cols="12" sm="4">
              <v-menu v-model="menuFecha" :close-on-content-click="false" transition="scale-transition" offset-y>
                <template #activator="{ props }">
                  <v-text-field v-bind="props" v-model="fecha" label="Seleccionar fecha" readonly variant="solo"
                    prepend-inner-icon="mdi-calendar" />
                </template>

                <v-card>
                  <v-date-picker v-model="fecha" @update:model-value="onFechaSelect" />

                  <v-card-actions>
                    <v-spacer />
                    <v-btn text color="red" @click="menuFecha = false">Cancelar</v-btn>
                    <v-btn text color="primary" @click="aceptarFecha">Aceptar</v-btn>


                    <!-- <v-btn text color="primary" @click="onFechaSelect(fecha)">Aceptar</v-btn> -->

                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-col>

            <!-- HORA (picker) -->
            <v-col cols="12" sm="4">
              <v-menu v-model="menuHora" :close-on-content-click="false" transition="scale-transition" offset-y>
                <template #activator="{ props }">
                  <v-text-field v-bind="props" v-model="hora" label="Seleccionar hora" readonly variant="solo"
                    prepend-inner-icon="mdi-clock-outline" />
                </template>

                <v-card>
                  <v-time-picker v-model="hora" format="24hr" @update:model-value="onHoraSelect" />

                  <v-card-actions>
                    <v-spacer />
                    <v-btn text color="red" @click="menuHora = false">Cancelar</v-btn>
                    <v-btn text color="primary" @click="aceptarHora">Aceptar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-col>

            <!-- MUESTRA FECHA-HORA COMBINADA (readonly) -->
            <v-col cols="12" sm="4">
              <v-text-field :value="fechaHoraISO ? fechaHoraISO : ''" label="FechaHora ISO" readonly variant="solo"
                prepend-inner-icon="mdi-calendar-clock" />
            </v-col>

            <!-- Equipo local / visitante / puntos / estado -->
            <v-col cols="12" sm="4">
              <v-text-field v-model="partido.Equipolocal" label="Equipo Local (ID)" type="number" variant="solo"
                prepend-inner-icon="mdi-home" />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field v-model="partido.EquipoVisitante" label="Equipo Visitante (ID)" type="number" variant="solo"
                prepend-inner-icon="mdi-airplane" />
            </v-col>

            <v-col cols="6" sm="3">
              <v-text-field v-model="partido.PuntosLocal" label="Puntos Local" type="number" variant="solo"
                prepend-inner-icon="mdi-numeric" />
            </v-col>

            <v-col cols="6" sm="3">
              <v-text-field v-model="partido.PuntosVisitante" label="Puntos Visitante" type="number" variant="solo"
                prepend-inner-icon="mdi-numeric" />
            </v-col>

            <v-col cols="12" sm="6">
              <v-switch v-model="partido.Status_Jugado" label="¿Partido jugado?" inset color="black" />
            </v-col>
          </v-row>

          <v-btn block color="black" class="mt-4 py-4" style="border-radius: 12px;"
            @click="partido.Id ? actualizarPartido() : insertarPartido()">
            {{ partido.Id ? "Actualizar Partido" : "Insertar Partido" }}
          </v-btn>
        </v-card>

        <!-- LISTADO DE PARTIDOS -->
        <v-card elevation="10" class="pa-6">
          <h2 class="text-center mb-4" style="font-family:'Anton'; letter-spacing:1px;">
            Partidos Registrados
          </h2>

          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="game in partidos" :key="game.Id">
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

                <v-btn block color="blue" class="mt-2" variant="outlined" @click="cargarPartido(game)">
                  Editar
                </v-btn>

                <v-btn block color="#b11320" class="mt-2" @click="eliminarPartido(game.Id)">
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
      // Pickers
      fecha: null,     // yyyy-mm-dd
      hora: null,      // HH:mm
      menuFecha: false,
      menuHora: false,

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

  computed: {
    // Genera la fecha final sin UTC
    fechaHoraISO() {
      if (!this.fecha || !this.hora) return null;
      return `${this.fecha} ${this.hora}:00`;
    }
  },

  methods: {
    // ---------------- PICKERS ----------------
    onFechaSelect(value) {
      if (!value) {
        this.fecha = null;
      } else if (typeof value === "string") {
        this.fecha = value;
      } else if (value instanceof Date) {
        this.fecha = value.toISOString().split("T")[0];
      } else {
        this.fecha = String(value);
      }
      this.menuFecha = false;
    },

    onHoraSelect(value) {
      if (!value) return;

      if (typeof value === "string") {
        const [h = "00", m = "00"] = value.split(":");
        this.hora = `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
      } else if (value instanceof Date) {
        const hh = String(value.getHours()).padStart(2, "0");
        const mm = String(value.getMinutes()).padStart(2, "0");
        this.hora = `${hh}:${mm}`;
      } else {
        this.hora = String(value);
      }

      // ❌ NO cerrar aquí
      // this.menuHora = false;
    },

    aceptarHora() {
      // ya tienes HH:mm en this.hora
      this.menuHora = false;
    },
    aceptarFecha() {
      this.menuFecha = false;
    },

    // ---------------- OBTENER ----------------
    async obtenerPartidos() {
      try {
        const res = await fetch("http://localhost:49986/APiLiga/Obtener/Partidos");
        this.partidos = await res.json();
      } catch (e) {
        console.error("Error al obtener partidos:", e);
      }
    },

    // ---------------- INSERTAR ----------------
    async insertarPartido() {
      try {
        if (this.fechaHoraISO) {
          this.partido.Fecha = this.fechaHoraISO; // SIN UTC
        } else {
          this.partido.Fecha = "";
        }

        const res = await fetch("http://localhost:49986/APiLiga/Insertar/Partidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.partido)
        });

        const text = await res.text();
        console.log("RESPUESTA SERVER:", text);

        if (!res.ok) {
          alert("Error al insertar: " + text);
          return;
        }

        alert("Partido insertado!");
        this.limpiarFormulario();
        this.obtenerPartidos();
      } catch (e) {
        console.error("ERROR GENERAL:", e);
      }
    },

    // ---------------- CARGAR PARA EDITAR ----------------
    // ---------------- CARGAR PARA EDITAR ----------------
    cargarPartido(data) {
      this.partido = { ...data };

      if (!data?.Fecha) {
        this.fecha = null;
        this.hora = null;
        return;
      }

      let fechaTexto = data.Fecha;

      // 1) Si viene con espacio: "YYYY-MM-DD HH:mm:ss"
      if (fechaTexto.includes(" ")) {
        const [f, horaCompleta] = fechaTexto.split(" ");
        this.fecha = f;
        this.hora = horaCompleta ? horaCompleta.substring(0, 5) : null;
        return;
      }

      // 2) Si viene con T o Z → usar Date pero sin convertir a UTC
      let fechaJS = new Date(fechaTexto);

      if (!isNaN(fechaJS.getTime())) {
        const yyyy = fechaJS.getFullYear();
        const mm = String(fechaJS.getMonth() + 1).padStart(2, "0");
        const dd = String(fechaJS.getDate()).padStart(2, "0");

        const hh = String(fechaJS.getHours()).padStart(2, "0");
        const min = String(fechaJS.getMinutes()).padStart(2, "0");

        this.fecha = `${yyyy}-${mm}-${dd}`;
        this.hora = `${hh}:${min}`;
      } else {
        // fallback si algo raro viene
        this.fecha = null;
        this.hora = null;
      }
    },


    // ---------------- ACTUALIZAR ----------------
    async actualizarPartido() {
      try {
        if (this.fechaHoraISO) {
          this.partido.Fecha = this.fechaHoraISO; // SIN UTC
        }

        const res = await fetch(
          `http://localhost:49986/APiLiga/Actualizar/Partido/${this.partido.Id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.partido)
          }
        );

        const text = await res.text();
        console.log("RESPUESTA ACTUALIZAR:", text);

        if (!res.ok) {
          alert("Error al actualizar: " + text);
          return;
        }

        alert("Partido actualizado 🏀👌");
        this.limpiarFormulario();
        this.obtenerPartidos();
      } catch (e) {
        console.error("ERROR actualizarPartido:", e);
      }
    },

    // ---------------- ELIMINAR ----------------
    async eliminarPartido(id) {
      if (!confirm("¿Deseas eliminar este partido?")) return;

      try {
        await fetch(`http://localhost:49986/APiLiga/Eliminar/partido/${id}`, {
          method: "DELETE"
        });

        alert("Partido eliminado ❌");
        this.obtenerPartidos();
      } catch (e) {
        console.error("Error al eliminar:", e);
      }
    },

    // ---------------- LIMPIAR ----------------
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
      this.fecha = null;
      this.hora = null;
      this.menuFecha = false;
      this.menuHora = false;
    },

    // ---------------- MOSTRAR FECHA ----------------
    formatFecha(dateString) {
      return dateString ?? "";
    }

  }
};
</script>


<style scoped>
/* ------------ TIPOGRAFÍA PRINCIPAL ------------ */
h1,
h2,
h3,
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
