<template>
  <v-app>
    <v-main class="basketball-bg">
      <v-container class="d-flex justify-center align-center" style="height: 100vh;">
        
        <v-card elevation="12" width="420" class="pa-6 rounded-xl glass-card">

          <!-- Encabezado -->
          <div class="text-center mb-6">
            <v-avatar size="90" color="orange darken-2" class="elevation-8">
              <v-icon size="60" color="white">mdi-basketball</v-icon>
            </v-avatar>

            <h2 class="mt-4 text-h5 font-weight-bold orange--text text--darken-2">
              Basketball Login
            </h2>
            <p class="grey--text text--darken-1">Bienvenido, inicia sesión para continuar</p>
          </div>

          <!-- Formulario -->
          <v-card-text>
            <v-form @submit.prevent="login">

              <v-text-field
                v-model="username"
                label="Usuario"
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
                dense
                rounded
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

            <!-- Registro -->
            <div class="text-center mt-6">
              <span class="grey--text text--darken-1">¿No tienes cuenta?</span>
              <br />
              <a href="/registerView" class="orange--text font-weight-bold">
                Crear cuenta
              </a>
            </div>

          </v-card-text>

        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.username + " logged in");
    },
  },
};
</script>

<style scoped>
/* Fondo tipo cancha de basquet */
.basketball-bg {
  background: url('https://i.imgur.com/bjx6w2C.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.9);
}

/* Efecto glass */
.glass-card {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85) !important;
}
</style>
