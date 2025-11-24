<template>
  <v-container fluid class="pagina-partidos py-10">
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

      <!-- DÍAS DE LA SEMANA -->
      <div class="d-flex justify-space-around">
        <div v-for="day in weekDays" :key="day.date" class="text-center px-3 py-2 day-item"
          :class="{ active: isSameDay(day.date, selectedDate) }" @click="selectDay(day)">
          <p class="text-caption">{{ day.weekday }}</p>
          <p class="font-weight-bold">{{ day.day }}</p>
          <p class="text-caption" v-if="day.games > 0">{{ day.games }} juegos</p>
        </div>
      </div>
    </v-sheet>

    <v-row class="mt-6">
      <!-- TARJETAS PARTIDOS -->
      <v-col cols="12" md="8">
        <div v-if="games.length === 0" class="mensaje">
          No hay partidos en esta fecha.
        </div>

        <v-sheet v-for="game in games" :key="game.id" class="tarjeta-partido">
          <v-row>
            <v-col cols="12" md="8" class="text-center border-right">
              <div class="d-flex justify-center align-center game-container">

                <!-- TEAM A -->
                <div class="team-side text-center mx-4">
                  <img :src="game.teamA.logo" width="70" class="team-logo" />
                  <p class="equipo-nombre mt-2">{{ game.teamA.name }}</p>
                </div>

                <!-- VS + HORA -->
                <div class="vs-container text-center mx-4">
                  <h2 class="hora">VS</h2>
                  <h3 class="hora">{{ game.time }} CT</h3>
                </div>

                <!-- TEAM B -->
                <div class="team-side text-center mx-4">
                  <img :src="game.teamB.logo" width="70" class="team-logo" />
                  <p class="equipo-nombre mt-2">{{ game.teamB.name }}</p>
                </div>

              </div>

              <div class="mt-4">
                <v-btn class="mt-1" variant="outlined">Vista Previa</v-btn>
              </div>
            </v-col>


            <v-col cols="12" md="4">
              <h3 class="subtitulo">Líderes del Partido</h3>

              <div v-if="game.leaders.length === 0" class="text-caption">No hay estadísticas disponibles</div>

              <div v-for="leader in game.leaders" :key="leader.name" class="leader-item">
                <img :src="leader.photo" width="40" height="40" class="rounded-circle" />
                <div class="ml-3">
                  <p class="leader-name">{{ leader.name }}</p>
                  <p class="leader-stats">
                    PTS: {{ leader.points }} · AST: {{ leader.ast }} · REB: {{ leader.reb }} · ROB: {{ leader.rob }}
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
            <p class="text-white mb-4">Your courtside seat to every game.</p>
            <v-btn color="yellow-darken-2" size="large">Sign Up Now</v-btn>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { watch } from "vue";
import { usePartidosStore } from "../../stores/PartidosStore";
import { useJugadoresStore } from "../../stores/JugadoresStore";
import { usePuntosStore } from "../../stores/PuntosJugadorStore"; // tu store de puntos

export default {
  data() {
    return {
      selectedDate: new Date(), // HOY por defecto
      weekDays: [],
      allGames: [], // partidos mapeados (internos)
      games: [], // partidos para la fecha seleccionada
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
    const jugadoresStore = useJugadoresStore();
    const puntosStore = usePuntosStore();
    return { partidosStore, jugadoresStore, puntosStore };
  },

  async mounted() {
    // Cargar datos en orden: jugadores -> partidos -> puntos
    // para asegurar que tengas imágenes y referencias para mapas
    await this.jugadoresStore.fetchAll();
    await this.partidosStore.fetchAll();
    await this.puntosStore.fetchAll();

    // Construir allGames mapeando partidos
    this.buildAllGames();

    // Generar días de la semana y filtrar por HOY
    this.generateWeekDays(this.selectedDate);
    this.filterGamesBySelectedDate();

    // Re-construir si cambian los stores
    watch(
      () => [this.partidosStore.partidos, this.jugadoresStore.jugadores, this.puntosStore.items],
      () => {
        this.buildAllGames();
        this.generateWeekDays(this.selectedDate);
        this.filterGamesBySelectedDate();
      },
      { immediate: false }
    );
  },

  methods: {
    // formato fecha legible
    formatDate(date) {
      return new Date(date).toLocaleDateString("es-MX", { day: "numeric", month: "long" });
    },

    // Construye allGames con información base (logos por equipo se obtienen desde jugadoresStore)
    buildAllGames() {
      const partidos = Array.isArray(this.partidosStore.partidos) ? this.partidosStore.partidos : [];

      this.allGames = partidos.map((p) => {
        // buscar logos en jugadoresStore (registro con Nombre === "Logo")
        const logoLocal = this.jugadoresStore.jugadores.find(j => j.Nombre === "Logo" && j.EquipoId === p.Equipolocal);
        const logoVisitante = this.jugadoresStore.jugadores.find(j => j.Nombre === "Logo" && j.EquipoId === p.EquipoVisitante);

        // función helper para normalizar imagen (si viene base64 o url)
        const resolvePlayerImage = (imgStr) => {
          if (!imgStr) return "/img/default-player.png";
          if (imgStr.startsWith("data:")) return imgStr; // ya es data url
          // si parece base64 sin prefijo, asumimos png
          if (/^[A-Za-z0-9+/=]{40,}$/.test(imgStr)) return `data:image/png;base64,${imgStr}`;
          // si es url
          return imgStr;
        };

        return {
          id: p.Id,
          raw: p, // el objeto original por si lo necesitas
          fecha: p.Fecha,
          time: p.Fecha ? new Date(p.Fecha).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) : "Por definir",
          teamA: {
            name: "Equipo " + p.Equipolocal,
            logo: logoLocal?.imagenURL ? resolvePlayerImage(logoLocal.imagenURL) : "/img/leaguePass.webp",
            equipId: p.Equipolocal,
          },
          teamB: {
            name: "Equipo " + p.EquipoVisitante,
            logo: logoVisitante?.imagenURL ? resolvePlayerImage(logoVisitante.imagenURL) : "/img/leaguePass.webp",
            equipId: p.EquipoVisitante,
          },
          leaders: [], // se calculan en filterGamesBySelectedDate()
        };
      });
    },

    generateWeekDays(baseDate) {
      const startOfWeek = new Date(baseDate);
      // mover al domingo
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      this.weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        return {
          date,
          day: date.getDate(),
          weekday: date.toLocaleDateString("es-MX", { weekday: "short" }),
          games: this.getGamesForDate(date),
        };
      });
    },

    isSameDay(d1, d2) {
      return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    },

    getGamesForDate(date) {
      const key = date.toISOString().split("T")[0];
      return this.allGames.filter((g) => g.fecha?.split("T")[0] === key).length;
    },

    prevWeek() {
      this.selectedDate.setDate(this.selectedDate.getDate() - 7);
      this.generateWeekDays(this.selectedDate);
      this.filterGamesBySelectedDate();
    },

    nextWeek() {
      this.selectedDate.setDate(this.selectedDate.getDate() + 7);
      this.generateWeekDays(this.selectedDate);
      this.filterGamesBySelectedDate();
    },

    selectDay(day) {
      this.selectedDate = new Date(day.date);
      this.filterGamesBySelectedDate();
      this.generateWeekDays(this.selectedDate);
    },

    // -----------------------------
    // Método principal pedido
    // Filtra partidos por fecha y calcula líderes por equipo (usa puntosStore.items)
    // -----------------------------
    filterGamesBySelectedDate() {
      // asegúrate fecha por defecto
      if (!this.selectedDate) this.selectedDate = new Date();

      const key = this.selectedDate.toISOString().split("T")[0];

      // partidos del día desde allGames
      const partidosFiltrados = this.allGames.filter(g => g.fecha?.split("T")[0] === key);

      // helper para resolver imagen de jugador (base64 o url)
      const resolvePlayerImage = (imgStr) => {
        if (!imgStr) return "/img/default-player.png";
        if (imgStr.startsWith("data:")) return imgStr;
        if (/^[A-Za-z0-9+/=]{40,}$/.test(imgStr)) return `data:image/png;base64,${imgStr}`;
        return imgStr;
      };

      // extraer datos
      this.games = partidosFiltrados.map(g => {
        const p = g.raw;

        // Filtrar puntos para este partido
        const puntosTodos = Array.isArray(this.puntosStore.items) ? this.puntosStore.items : [];

        // Obtener los puntos relacionados a jugadores de cada equipo
        const puntosLocal = puntosTodos.filter(pt => {
          // pt.JugadorId existe; buscar jugador y comparar EquipoId
          const jugador = this.jugadoresStore.jugadores.find(j => j.Id === pt.JugadorId);
          return jugador?.EquipoId === p.Equipolocal;
        });

        const puntosVisitante = puntosTodos.filter(pt => {
          const jugador = this.jugadoresStore.jugadores.find(j => j.Id === pt.JugadorId);
          return jugador?.EquipoId === p.EquipoVisitante;
        });

        // Calcular "puntos" estimados a partir de Triples, Tiros_Dos y Tiros_Libres
        const calcPoints = (pt) => {
          const triples = Number(pt.Triples || 0);
          const dos = Number(pt.Tiros_Dos || 0);
          const libres = Number(pt.Tiros_Libres || 0);
          return triples * 3 + dos * 2 + libres * 1;
        };

        // seleccionar mejor anotador por equipo (o fallback a cualquier jugador del equipo)
        const bestLocalEntry = puntosLocal
          .map(pt => ({ pt, pts: calcPoints(pt) }))
          .sort((a, b) => b.pts - a.pts)[0];

        const bestVisitEntry = puntosVisitante
          .map(pt => ({ pt, pts: calcPoints(pt) }))
          .sort((a, b) => b.pts - a.pts)[0];

        // Si no hay datos en puntos, buscamos un jugador cualquiera del equipo (no "Logo")
        const fallbackJugadorLocal = this.jugadoresStore.jugadores.find(j => j.EquipoId === p.Equipolocal && j.Nombre !== "Logo");
        const fallbackJugadorVisit = this.jugadoresStore.jugadores.find(j => j.EquipoId === p.EquipoVisitante && j.Nombre !== "Logo");

        const mapLeaderFromEntry = (entry) => {
          if (!entry) return null;
          const pt = entry.pt;
          const jugador = this.jugadoresStore.jugadores.find(j => j.Id === pt.JugadorId);
          const name = jugador ? `${jugador.Nombre} ${jugador.Apellido_Paterno || ""}`.trim() : `Jugador ${pt.JugadorId}`;
          return {
            name,
            photo: resolvePlayerImage(jugador?.imagenURL),
            points: entry.pts,
            ast: Number(pt.Asistencias || 0),
            reb: Number(pt.Rebotes || 0),
            rob: Number(pt.Robos || 0),
          };
        };

        // mapear fallback a formato similar
        const mapLeaderFromJugador = (jugador) => {
          if (!jugador) return null;
          // encontrar su entry en puntos si existe
          const pt = puntosTodos.find(x => x.JugadorId === jugador.Id);
          const pts = pt ? calcPoints(pt) : 0;
          return {
            name: `${jugador.Nombre} ${jugador.Apellido_Paterno || ""}`.trim(),
            photo: resolvePlayerImage(jugador.imagenURL),
            points: pts,
            ast: pt ? Number(pt.Asistencias || 0) : 0,
            reb: pt ? Number(pt.Rebotes || 0) : 0,
            rob: pt ? Number(pt.Robos || 0) : 0,
          };
        };

        let leaderLocal = mapLeaderFromEntry(bestLocalEntry) || mapLeaderFromJugador(fallbackJugadorLocal);
        let leaderVisit = mapLeaderFromEntry(bestVisitEntry) || mapLeaderFromJugador(fallbackJugadorVisit);

        // Remove possible nulls
        const leaders = [leaderLocal, leaderVisit].filter(Boolean);

        return {
          id: g.id,
          fecha: g.fecha,
          time: g.time,
          teamA: g.teamA,
          teamB: g.teamB,
          leaders
        };
      });

      // actualizar conteo de juegos en weekDays
      this.weekDays = this.weekDays.map(d => ({ ...d, games: this.getGamesForDate(d.date) }));
    }
  }
};
</script>

<style scoped>
.game-container {
  padding: 10px 0;
}

.team-side .team-logo {
  border-radius: 8px;
}

.equipo-nombre {
  font-weight: bold;
  font-size: 14px;
  margin-top: 5px;
}

.vs-container .hora {
  font-weight: bold;
  font-size: 20px;
}

.border-right {
  border-right: 2px solid #e0e0e0;
}

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

.day-item {
  border-radius: 8px;
  cursor: pointer;
}

.day-item.active {
  background-color: black;
  color: white;
  border-radius: 8px;
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
