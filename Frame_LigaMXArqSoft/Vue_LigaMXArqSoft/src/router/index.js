import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/Login/LoginView.vue'
import RegisterView from '../views/Register/RegisterView.vue'
import GamesView from '../views/Games/GamesView.vue'
//import JugadoresView from '../views/Jugadores/JugadoresView.vue' // <-- asegúrate que exista

const routes = [
  // Redirige "/" a "/login" o a donde quieras
  { path: '/', redirect: '/login' },

//  { path: '/jugadores', component: JugadoresView },
  { path: '/registro', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/games', component: GamesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
