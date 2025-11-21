import { createRouter, createWebHistory } from "vue-router";
import { useUsuariosStore } from "../stores/UsuariosStore";

import LoginView from "../views/Login/LoginView.vue";
import RegisterView from "../views/Register/RegisterView.vue";
import GamesView from "../views/Games/GamesView.vue";
import TeamsView from "../views/Games/TeamsView.vue";
import StandingsView from "../views/Games/StandingsView.vue";
import PlayerView from "../views/Games/PlayerView.vue";
import TeamsCrud from "@/views/Games/TeamsCrud.vue";
import PlayersCrud from "@/views/Games/PlayersCrud.vue";
import UpdateEquipoView from "@/views/Games/UpdateEquipoView.vue";

const routes = [
  { path: "/", redirect: "/login" },

  { path: "/registro", component: RegisterView },
  { path: "/login", component: LoginView },

  //Rutas protegidas
  { path: "/games", component: GamesView, meta: { requiresAuth: true } },
  //{ path: "/games", component: GamesView },
  { path: "/teams", component: TeamsView, meta: { requiresAuth: true } },
  { path: "/standings", component: StandingsView, meta: { requiresAuth: true } },
  { path: "/player", component: PlayerView, meta: { requiresAuth: true } },

  //CRUDs también protegidos
  { path: "/playerscrud", component: PlayersCrud, meta: { requiresAuth: true } },
  { path: "/teamscrud", component: TeamsCrud, meta: { requiresAuth: true } },
  { path: "/update", component: UpdateEquipoView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ----------------------------------------------------------
//BLOQUEAR ACCESO A RUTAS PROTEGIDAS
// ----------------------------------------------------------
router.beforeEach((to, from, next) => {
  const userStore = useUsuariosStore();

  // Si intenta entrar a una ruta protegida sin estar logeado
  if (to.meta.requiresAuth && !userStore.authUser) {
    return next("/registro");
  }

  next();
});

export default router;
