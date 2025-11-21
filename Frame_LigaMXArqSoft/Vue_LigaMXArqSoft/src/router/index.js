import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/Login/LoginView.vue'
import RegisterView from '../views/Register/RegisterView.vue'
import GamesView from '../views/Games/GamesView.vue'
import TeamsView from '../views/Games/TeamsView.vue'
import StandingsView from '../views/Games/StandingsView.vue'
import PlayerView from '../views/Games/PlayerView.vue'
import TeamsCrud from '@/views/Games/TeamsCrud.vue'
import PlayersCrud from '@/views/Games/PlayersCrud.vue'
import UpdateEquipoView from '@/views/Games/UpdateEquipoView.vue'


//import JugadoresView from '../views/Jugadores/JugadoresView.vue' // <-- asegúrate que exista

const routes = [
  // Redirige "/" a "/login" o a donde quieras
  { path: '/', redirect: '/login' },

//  { path: '/jugadores', component: JugadoresView },
  { path: '/registro', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/games', component: GamesView },
  { path: '/teams', component: TeamsView },
  { path: '/standings', component: StandingsView },
  { path: '/playerscrud', component: PlayersCrud },
  { path: '/teamscrud', component: TeamsCrud },
  { path: '/player', component: PlayerView},
  { path: '/update', component: UpdateEquipoView},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
