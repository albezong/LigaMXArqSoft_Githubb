import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/Login/LoginView.vue'
import RegisterView from '../views/Register/RegisterView.vue'
import RegistrationWizard from '../views/Register/RegistrationWizard.vue'

const routes = [
  //{ path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/registerView', component: RegisterView },
  { path: '/Regist2', component: RegistrationWizard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
