<template>
  <v-app>
    <v-main>
      <v-container>

        <h1 class="text-h4 font-weight-bold mb-6">Tabla de Posiciones</h1>

        <v-card elevation="10" class="pa-4">

          <v-table>
            <thead>
              <tr>
                <th>Equipo</th>
                <th>Partidos Jugados</th>
                <th>Victorias</th>
                <th>Derrotas</th>
                <th>Puntos Anotados</th>
                <th>Puntos en Contra</th>
                <th>Diferencia</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(team, index) in standings" :key="index">
                <td class="d-flex align-center">
                  <v-avatar size="40" class="mr-2">
                    <img :src="team.logo" style="object-fit: cover;" />
                  </v-avatar>
                  {{ team.name }}
                </td>

                <td>{{ team.played }}</td>
                <td>{{ team.wins }}</td>
                <td>{{ team.losses }}</td>

                <td>{{ team.pointsFor }}</td>
                <td>{{ team.pointsAgainst }}</td>

                <td :style="{ color: team.pointsFor - team.pointsAgainst >= 0 ? 'green' : 'red' }">
                  {{ team.pointsFor - team.pointsAgainst }}
                </td>
              </tr>
            </tbody>
          </v-table>

        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "StandingsView",

  data() {
    return {
      standings: [
        {
          name: "Celtics",
          logo: "/img/celtics.jpeg",
          played: 20,
          wins: 16,
          losses: 4,
          pointsFor: 2200,
          pointsAgainst: 2001
        },
        {
          name: "Raptors",
          logo: "/img/raptors.jpeg",
          played: 20,
          wins: 10,
          losses: 10,
          pointsFor: 2050,
          pointsAgainst: 2040
        },
        {
          name: "Bulls",
          logo: "/img/bulls.jpeg",
          played: 20,
          wins: 8,
          losses: 12,
          pointsFor: 1980,
          pointsAgainst: 2100
        },
        {
          name: "Warriors",
          logo: "/img/warriors.jpeg",
          played: 20,
          wins: 14,
          losses: 6,
          pointsFor: 2300,
          pointsAgainst: 2190
        },
        {
          name: "Wolves",
          logo: "/img/wolves.jpeg",
          played: 20,
          wins: 12,
          losses: 8,
          pointsFor: 2125,
          pointsAgainst: 2080
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>