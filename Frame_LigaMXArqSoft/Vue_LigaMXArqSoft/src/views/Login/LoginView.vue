<template> 
  <v-app>  
    <v-main class="basketball-bg">
      <v-container class="d-flex justify-center align-center" style="height: 100vh;">
        
        <v-card elevation="12" width="420" class="pa-6 rounded-xl glass-card">

          <div class="text-center mb-6">
            <v-avatar size="90" color="orange darken-2" class="elevation-8">
              <v-icon size="60" color="white">mdi-basketball</v-icon>
            </v-avatar>

            <h2 class="mt-4 text-h5 font-weight-bold orange--text text--darken-2">
              Basketball Login
            </h2>
            <p class="grey--text text--darken-1">
              Bienvenido, inicia sesión para continuar
            </p>
          </div>

          <v-card-text>
            <v-form @submit.prevent="login">
              
              <v-text-field
                v-model="email"
                label="Correo"
                outlined
                rounded
                dense
                color="orange darken-2"
                prepend-inner-icon="mdi-account"
                required
              />

              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
                outlined
                rounded
                dense
                color="orange darken-2"
                prepend-inner-icon="mdi-lock"
                required
              />

              <v-btn
                type="submit"
                block
                class="mt-4"
                color="orange darken-2"
                dark
                large
                rounded
              >
                Iniciar sesión
              </v-btn>

            </v-form>

            <div class="text-center mt-6">
              <span class="grey--text text--darken-1">¿No tienes cuenta?</span>
              <br />
              <RouterLink to="/registerView" class="orange--text font-weight-bold">
                Crear cuenta
              </RouterLink>
            </div>

          </v-card-text>

        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useUsuariosStore } from "../../stores/UsuariosStore";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  setup() {
    const usuariosStore = useUsuariosStore();
    return { usuariosStore };
  },

  mounted() {
    // Carga la lista de usuarios si se necesita para otras partes del proyecto
    this.usuariosStore.fetchAll();
  },

  methods: {
    async login() {
      const ok = await this.usuariosStore.login(this.email, this.password);

      if (!ok) {
        alert(this.usuariosStore.error || "Error al iniciar sesión");
      }
    }
  }
};
</script>


<style scoped>
.basketball-bg {
  background-image: url('../../../img/fondo1.jpeg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.9);
}

.glass-card {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85) !important;
}
</style>
