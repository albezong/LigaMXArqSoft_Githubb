<template>
  <v-container fluid class="pagina-partidos py-10">

    <!-- TÍTULO PRINCIPAL CENTRADO -->
    <h1 class="titulo-principal">Partidos y Marcadores</h1>

    <!-- SELECTOR DE FECHAS -->
    <v-sheet class="selector-fechas">
      <div class="d-flex justify-space-between align-center">
        <h3 class="font-weight-bold text-h6">{{ formattedWeekRange }}</h3>

        <div>
          <v-btn icon @click="prevWeek">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon @click="nextWeek">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>

      <v-divider class="my-2"></v-divider>

      <div class="d-flex justify-space-around">
        <div v-for="day in weekDays" :key="day.date" class="text-center px-3 py-2 day-item"
          :class="{ active: day.isToday }" @click="selectDay(day)">
          <p class="text-caption">{{ day.weekday }}</p>
          <p class="font-weight-bold">{{ day.day }}</p>
          <p class="text-caption" v-if="day.games > 0">{{ day.games }} juegos</p>
        </div>
      </div>
    </v-sheet>

    <v-row class="mt-6">

      <!-- TARJETAS DE PARTIDOS -->
      <v-col cols="12" md="8">
        <div v-if="games.length === 0" class="mensaje">
          No hay partidos en esta fecha.
        </div>

        <v-sheet v-for="game in games" :key="game.id" class="tarjeta-partido">
          <v-row>

            <!-- EQUIPOS -->
            <v-col cols="12" md="4" class="text-center border-right">
              <img :src="game.teamA.logo" width="60" />
              <p class="equipo-nombre">{{ game.teamA.name }}</p>

              <h2 class="hora">{{ game.time }} CT</h2>

              <img :src="game.teamB.logo" width="60" />
              <p class="equipo-nombre">{{ game.teamB.name }}</p>

              <v-btn class="mt-3" variant="outlined">Vista Previa</v-btn>
              <v-btn class="mt-3 mx-2" color="primary">Entradas</v-btn>

              <p class="liga-pass">Pase de la liga</p>
            </v-col>

            <!-- LÍDERES -->
            <v-col cols="12" md="8">
              <h3 class="subtitulo">Líderes de la Temporada</h3>

              <div v-for="leader in game.leaders" :key="leader.name" class="leader-item">
                <img :src="leader.photo" width="40" height="40" class="rounded-circle" />
                <div class="ml-3">
                  <p class="leader-name">{{ leader.name }}</p>
                  <p class="leader-stats">
                    PPG: {{ leader.ppg }} · RPG: {{ leader.rpg }} · APG: {{ leader.apg }}
                  </p>
                </div>
              </div>
            </v-col>

          </v-row>
        </v-sheet>
      </v-col>

      <!-- BANNER -->
      <v-col cols="12" md="4">
        <v-img src="../../../public/img/leaguePass.webp" height="260" cover class="rounded-lg banner">
          <div class="banner-overlay-content">
            <h2 class="text-white font-weight-bold mb-2">League Pass</h2>
            <p class="text-white mb-4">
              Your courtside seat to every game.
            </p>
            <v-btn color="yellow-darken-2" size="large">Sign Up Now</v-btn>
          </div>
        </v-img>
      </v-col>

    </v-row>

  </v-container>
</template>


<script>
import { onMounted, reactive, watch } from "vue";
import { usePartidosStore } from "../../stores/PartidosStore";

export default {
  data() {
    return {
      selectedDate: new Date(),
      weekDays: [],
      games: [], // se llenará desde Pinia
    };
  },

  computed: {
    formattedWeekRange() {
      if (this.weekDays.length === 0) return "";
      const start = this.weekDays[0].date;
      const end = this.weekDays[6].date;
      return `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
  },

  setup() {
    const partidosStore = usePartidosStore();
    return { partidosStore };
  },

  mounted() {
    // cargar partidos desde la API
    this.partidosStore.fetchAll();

    // generar la semana
    this.generateWeekDays(this.selectedDate);

    // observar cambios y actualizar "games"
    watch(
      () => this.partidosStore.partidos,
      (lista) => {

        if (!Array.isArray(lista)) {
          this.games = [];
          return;
        }

        this.games = lista.map((p) => ({
          id: p.Id,
          fecha: p.Fecha,
          time: p.Fecha?.split("T")[1]?.substring(0, 5) || "Por definir",

          teamA: {
            name: "Equipo " + p.Equipolocal,
            logo: "https://via.placeholder.com/50?text=" + p.Equipolocal,
            record: "0-0",
          },

          teamB: {
            name: "Equipo " + p.EquipoVisitante,
            logo: "https://via.placeholder.com/50?text=" + p.EquipoVisitante,
            record: "0-0",
          },

          leaders: [],
        }));

        this.generateWeekDays(this.selectedDate);

      },
      { immediate: true }
    );



  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
      });
    },

    generateWeekDays(baseDate) {
      const startOfWeek = new Date(baseDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      this.weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        return {
          date,
          day: date.getDate(),
          weekday: date.toLocaleDateString("es-MX", { weekday: "short" }),
          isToday: this.isSameDay(date, new Date()),
          games: this.getGamesForDate(date),
        };
      });
    },

    isSameDay(d1, d2) {
      return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
      );
    },

    getGamesForDate(date) {
      const key = date.toISOString().split("T")[0];
      const partidosEnFecha = this.games.filter(
        (g) => g.fecha.split("T")[0] === key
      );
      return partidosEnFecha.length;
    },

    prevWeek() {
      this.selectedDate.setDate(this.selectedDate.getDate() - 7);
      this.generateWeekDays(this.selectedDate);
    },

    nextWeek() {
      this.selectedDate.setDate(this.selectedDate.getDate() + 7);
      this.generateWeekDays(this.selectedDate);
    },

    selectDay(day) {
      this.selectedDate = new Date(day.date);
    },
  },
};
</script>



<style scoped>
.pagina-partidos {
  background-color: #f7f8fa;
  min-height: 100vh;
}

.titulo-principal {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.selector-fechas {
  border-radius: 12px;
  background: white;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

/* TARJETA DE PARTIDO */
.tarjeta-partido {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

/* Equipos */
.equipo-nombre {
  font-weight: bold;
  margin: 5px 0;
}

.hora {
  font-size: 1.4rem;
  margin: 12px 0;
  font-weight: bold;
}

/* Líderes */
.subtitulo {
  font-weight: bold;
  margin-bottom: 10px;
}

.leader-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.leader-name {
  font-weight: bold;
}

.leader-stats {
  font-size: 0.8rem;
  color: gray;
}

/* Banner */
.banner {
  position: relative;
}

.banner-overlay-content {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
