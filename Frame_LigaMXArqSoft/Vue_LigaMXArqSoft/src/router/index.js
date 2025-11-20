import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/Login/LoginView.vue'
import RegisterView from '../views/Register/RegisterView.vue'

const routes = [
  //{ path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/registerView', component: RegisterView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
