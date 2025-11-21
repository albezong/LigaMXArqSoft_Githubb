<template>
  <v-app>
    <v-main>
      <v-container>

        <!-- TÍTULO -->
        <h2 class="text-h4 font-weight-bold mb-6">
          {{ teamName }} - Jugadores
        </h2>

        <!-- GRID DE JUGADORES -->
        <v-row>
          <v-col
            v-for="player in filteredPlayers"
            :key="player.Numero"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card elevation="6" class="pa-3">

              <!-- IMAGEN DEL JUGADOR -->
              <v-img
                :src="player.ImagenURL"
                height="220"
                cover
                class="rounded-lg mb-3"
              />

              <!-- DATOS -->
              <v-card-title class="text-h6 font-weight-bold">
                #{{ player.Numero }} - {{ player.Nombre }} {{ player.Apellido }}
              </v-card-title>

              <v-card-text>
                <div><strong>Posición:</strong> {{ player.Posicion }}</div>
                <div><strong>Equipo:</strong> {{ player.Equipo }}</div>
              </v-card-text>

            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "PlayersView",

  data() {
    return {
      // LISTA DE JUGADORES (puedes ampliarla y editarla)
      players: [
        {
          Nombre: "Jayson",
          Apellido: "Tatum",
          Posicion: "Alero",
          Numero: 0,
          Equipo: "Celtics",
          ImagenURL: "/img/celtics.jpeg"
        },
        {
          Nombre: "Zach",
          Apellido: "LaVine",
          Posicion: "Escolta",
          Numero: 8,
          Equipo: "Bulls",
          ImagenURL: "/img/bulls.jpeg"
        },
        {
          Nombre: "Stephen",
          Apellido: "Curry",
          Posicion: "Base",
          Numero: 30,
          Equipo: "Warriors",
          ImagenURL: "/img/warriors.jpeg"
        },
        {
          Nombre: "Scottie",
          Apellido: "Barnes",
          Posicion: "Ala",
          Numero: 4,
          Equipo: "Raptors",
          ImagenURL: "/img/raptors.jpeg"
        },
        {
          Nombre: "Anthony",
          Apellido: "Edwards",
          Posicion: "Escolta",
          Numero: 1,
          Equipo: "Wolves",
          ImagenURL: "/img/wolves.jpeg"
        }
      ]
    };
  },

  computed: {
    teamName() {
      return this.$route.params.team.toUpperCase();
    },

    filteredPlayers() {
      return this.players.filter(
        (p) => p.Equipo.toLowerCase() === this.$route.params.team.toLowerCase()
      );
    }
  }
};
</script>

<style scoped>
</style>