<template>
  <v-app>
    <v-main class="bg-grey-darken-4">
      <v-container class="py-10" style="max-width: 600px;">
        
        <!-- Título -->
        <h2 class="text-white mb-2">Crea tu cuenta</h2>
        <p class="text-grey mb-6">
          Ayúdanos a conocerte para darte la mejor experiencia basquetbolera.
        </p>

        <!-- STEPS -->
        <v-stepper v-model="step" class="rounded-xl pa-4">

          <!-- PASO 1 -->
          <v-stepper-step :complete="step > 1" step="1">
            Datos personales
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-text-field label="Nombre" v-model="form.nombre" outlined></v-text-field>
            <v-text-field label="Email" v-model="form.email" outlined></v-text-field>
            <v-btn color="primary" block @click="step = 2">Siguiente</v-btn>
          </v-stepper-content>

          <!-- PASO 2 -->
          <v-stepper-step :complete="step > 2" step="2">
            ¿Qué estilo de jugador eres?
          </v-stepper-step>
          <v-stepper-content step="2">
            
            <v-card
              :elevation="form.jugadorTipo === 'Ofensivo' ? 12 : 2"
              class="pa-4 my-2"
              @click="form.jugadorTipo = 'Ofensivo'"
            >
              <strong>Ofensivo</strong>
              <div class="text-grey">Te gusta encestar, tirar triples y atacar.</div>
            </v-card>

            <v-card
              :elevation="form.jugadorTipo === 'Defensivo' ? 12 : 2"
              class="pa-4 my-2"
              @click="form.jugadorTipo = 'Defensivo'"
            >
              <strong>Defensivo</strong>
              <div class="text-grey">Bloqueos, robos y presión constante.</div>
            </v-card>

            <v-btn class="mt-4" variant="tonal" @click="step = 1">Atrás</v-btn>
            <v-btn color="primary" class="mt-4" @click="step = 3">Siguiente</v-btn>
          </v-stepper-content>

          <!-- PASO 3 -->
          <v-stepper-step :complete="step > 3" step="3">
            Rol dentro del basquetbol
          </v-stepper-step>
          <v-stepper-content step="3">

            <v-select
              label="Rol"
              v-model="form.rol"
              :items="['Jugador', 'Entrenador', 'Aficionado']"
              outlined
            ></v-select>

            <v-text-field
              label="Contraseña"
              type="password"
              v-model="form.contraseña"
              outlined
            ></v-text-field>

            <v-btn class="mt-4" variant="tonal" @click="step = 2">Atrás</v-btn>
            <v-btn color="primary" class="mt-4" @click="step = 4">Siguiente</v-btn>
          </v-stepper-content>

          <!-- PASO 4 -->
          <v-stepper-step step="4">Confirmación</v-stepper-step>
          <v-stepper-content step="4">
            <h3>Revisa tus datos:</h3>
            <p><strong>Nombre:</strong> {{ form.nombre }}</p>
            <p><strong>Email:</strong> {{ form.email }}</p>
            <p><strong>Tipo jugador:</strong> {{ form.jugadorTipo }}</p>
            <p><strong>Rol:</strong> {{ form.rol }}</p>

            <v-btn class="mt-4" variant="tonal" @click="step = 3">Atrás</v-btn>
            <v-btn color="primary" class="mt-4" @click="register">Crear cuenta</v-btn>
          </v-stepper-content>

        </v-stepper>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      form: {
        nombre: "",
        email: "",
        contraseña: "",
        rol: "",
        jugadorTipo: ""
      }
    };
  },
  methods: {
    register() {
      console.log("Datos enviados al backend:", this.form);

      // Aquí harías tu POST hacia tu API .NET:
      // await axios.post("/api/usuarios", this.form);

      alert("¡Cuenta creada con éxito!");
    }
  }
};
</script>

<style>
.text-grey {
  color: #a0a0a0;
}
</style>
