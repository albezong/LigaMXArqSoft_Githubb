<template>
  <v-app>
    <v-main class="basketball-bg">
      <v-container 
        class="d-flex justify-center align-center"
        style="height: 100vh;"
      >
        <v-card width="420" elevation="12" class="pa-6 rounded-xl glass-card">

          <!-- Encabezado con ícono -->
          <div class="text-center mb-6">
            <v-avatar size="90" color="orange darken-2" class="elevation-8">
              <v-icon size="60" color="white">mdi-account-plus</v-icon>
            </v-avatar>

            <h2 class="mt-4 text-h5 font-weight-bold orange--text text--darken-2">
              Crear Cuenta
            </h2>
            <p class="grey--text text--darken-1">
              Únete al equipo y regístrate
            </p>
          </div>

          <v-card-text>
            <v-form ref="form" @submit.prevent="register">

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
                rounded
                dense
                color="orange darken-2"
                prepend-inner-icon="mdi-lock"
                required
              />

              <v-text-field
                v-model="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                outlined
                rounded
                dense
                color="orange darken-2"
                prepend-inner-icon="mdi-lock-check"
                required
              />

              <!-- Mensaje de error -->
              <div class="text-center mt-2" v-if="errorMessage">
                <span class="red--text font-weight-bold">{{ errorMessage }}</span>
              </div>

              <v-btn 
                type="submit"
                color="orange darken-2"
                dark
                large
                rounded
                block
                class="mt-4"
              >
                Registrar
              </v-btn>

            </v-form>

            <!-- Volver a login -->
            <div class="text-center mt-6">
              <span class="grey--text text--darken-1">¿Ya tienes cuenta?</span>
              <br />
              <a href="/login" class="orange--text font-weight-bold">
                Iniciar sesión
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
  name: "RegisterView",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    };
  },
  methods: {
    register() {
      if (this.password === this.confirmPassword) {
        console.log("User registered:", this.username);
        this.errorMessage = "";
        this.$refs.form.reset();
      } else {
        this.errorMessage = "Las contraseñas no coinciden.";
      }
    }
  }
};
</script>

<style scoped>
/* Fondo tipo cancha de basquetbol */
.basketball-bg {
  background-image: url('@/img/fondo3.jpeg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.9);
}

/* Efecto glass moderno */
.glass-card {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85) !important;
}
</style>
