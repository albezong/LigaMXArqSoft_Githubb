<template>
  <v-app>
    <v-main class="basketball-bg">

      <v-container class="d-flex justify-center align-center" style="height: 100vh;">
        <v-card width="450" elevation="12" class="pa-6 rounded-xl glass-card">

          <!-- botón regresar -->
          <v-btn icon @click="$router.back()" class="mb-4">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <!-- Título -->
          <h2 class="text-h5 font-weight-bold text-center orange--text">
            Cuéntanos tu estilo de vida
          </h2>
          <p class="text-center grey--text text--darken-1 mb-5">
            Este proceso nos ayudará a encontrarte la experiencia perfecta
          </p>

          <!-- Indicadores -->
          <div class="d-flex justify-center mb-6">
            <div v-for="n in 4" :key="n" class="step-circle" :class="{ active: step >= n }">
              {{ n }}
            </div>
          </div>

          <!-- CONTENIDO DE CADA PASO -->
          <v-form ref="form">

            <!-- PASO 1: NOMBRE Y EMAIL -->
            <div v-if="step === 1">
              <v-text-field v-model="nombre" label="Nombre" outlined dense rounded prepend-inner-icon="mdi-account" />

              <v-text-field v-model="email" label="Email" outlined dense rounded prepend-inner-icon="mdi-email" />
            </div>

            <!-- PASO 2: CONTRASEÑA -->
            <div v-if="step === 2">
              <v-text-field v-model="password" label="Contraseña" type="password" outlined dense rounded
                prepend-inner-icon="mdi-lock" />

              <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" type="password" outlined dense
                rounded prepend-inner-icon="mdi-lock-check" />

              <div v-if="errorMessage" class="red--text text-center mt-2">
                {{ errorMessage }}
              </div>
            </div>

            <!-- PASO 3: ELECCIÓN DE ROL -->
            <div v-if="step === 3">
              <p class="text-subtitle-1 font-weight-bold">Selecciona tu rol</p>

              <v-radio-group v-model="rol">
                <v-radio label="Entrenador" value="Entrenador"></v-radio>
                <v-radio label="Jugador" value="Jugador"></v-radio>
                <v-radio label="Usuario" value="Usuario"></v-radio>
              </v-radio-group>
            </div>

            <!-- PASO 4: RESUMEN -->
            <div v-if="step === 4">
              <h3 class="text-h6 font-weight-bold">Resumen</h3>

              <p><b>Nombre:</b> {{ nombre }}</p>
              <p><b>Email:</b> {{ email }}</p>
              <p><b>Rol:</b> {{ rol }}</p>

              <p class="grey--text text--darken-1 mt-3">
                Si todo está correcto, presiona "Registrar".
              </p>
            </div>

            <!-- PASO 5: SUBIR IMAGEN -->
            <div v-if="step === 5">
              <p class="text-h6 font-weight-bold mb-3">Sube tu imagen de perfil</p>

              <!-- Vista previa -->
              <div class="d-flex justify-center mb-4">
                <v-avatar size="120" v-if="previewImage">
                  <img :src="previewImage" alt="Imagen seleccionada">
                </v-avatar>

                <v-avatar size="120" color="grey lighten-2" v-else>
                  <v-icon size="50">mdi-account</v-icon>
                </v-avatar>
              </div>

              <!-- Input de imagen -->
              <v-file-input v-model="imageFile" label="Selecciona una imagen" accept="image/*"
                prepend-inner-icon="mdi-image" outlined dense rounded @change="previewSelectedImage"></v-file-input>

              <div v-if="imageError" class="red--text mt-2 text-center">
                {{ imageError }}
              </div>
            </div>


            <!-- BOTONES NAVEGACIÓN -->
            <div class="d-flex justify-space-between mt-6">
              <v-btn v-if="step > 1" @click="step--" color="grey" rounded>
                Atrás
              </v-btn>

              <v-btn v-if="step < 4" color="orange darken-2" dark rounded @click="nextStep">
                Siguiente
              </v-btn>

              <v-btn v-if="step === 4" color="orange darken-2" dark rounded @click="register">
                Registrar
              </v-btn>
            </div>

          </v-form>

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
      step: 1,

      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
      rol: "",

      errorMessage: ""
    };
  },

  setup() {
    const usuariosStore = useUsuariosStore();
    return { usuariosStore };
  },

  methods: {
    nextStep() {
      if (this.step === 2 && this.password !== this.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden.";
        return;
      }
      this.errorMessage = "";
      this.step++;
    },

    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden";
        return;
      }

      const user = {
        Nombre: this.nombre,
        Email: this.email,
        Contraseña: this.password,
        Rol: this.rol,
        FechaRegistro: new Date().toISOString()
      };

      try {
        // 🚀 llamar al POST usando tu store
        await this.usuariosStore.create(user);

        alert("Registro completado");

        this.$router.push("/login");

      } catch (err) {
        console.error("Error al registrar:", err);
        this.errorMessage = "Ocurrió un error al registrar el usuario.";
      }
    }
  }
};
</script>

<style scoped>
/* Indicadores de pasos */
.step-circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #3a3a3a;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6px;
  font-weight: bold;
}

.step-circle.active {
  background: #4a6cf7;
}

/* Imagen de fondo */
.basketball-bg {
  background-image: url('../../img/fondo3.jpeg');
  background-size: cover;
  background-position: center;
}

/* Glass effect */
.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.85) !important;
}
</style>
