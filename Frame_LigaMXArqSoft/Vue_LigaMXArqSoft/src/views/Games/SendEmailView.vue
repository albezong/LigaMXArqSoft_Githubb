<template>
  <v-app>
    <v-main>
      <v-container class="d-flex justify-center mt-12">
        <v-card
          width="550"
          elevation="12"
          class="pa-6"
          style="border-radius: 18px;
                 background: linear-gradient(135deg, #ff8c00, #ff3d00); 
                 color: white;"
        >
          <!-- HEADER -->
          <v-row class="d-flex justify-center mb-4">
            <v-avatar size="90" class="elevation-10">
              <img
                src="/img/fondo2.jpeg"
                alt="basketball"
                style="object-fit: cover"
              />
            </v-avatar>
          </v-row>

          <h2 class="text-center font-weight-bold mb-6">
            Enviar Mensaje
          </h2>

          <v-card-text>
            <v-form @submit.prevent="sendEmail">

              <v-text-field
                v-model="email.Destinatario"
                label="Destinatario"
                variant="solo"
                prepend-inner-icon="mdi-email"
                color="white"
                class="mb-3"
                required
              />

              <v-text-field
                v-model="email.Asunto"
                label="Asunto"
                variant="solo"
                prepend-inner-icon="mdi-basketball"
                color="white"
                class="mb-3"
                required
              />

              <v-textarea
                v-model="email.Mensaje"
                label="Mensaje"
                variant="solo"
                auto-grow
                prepend-inner-icon="mdi-pencil"
                color="white"
                required
              />

              <v-btn
                type="submit"
                color="black"
                block
                class="mt-6 py-4"
                style="border-radius: 12px; font-size: 16px;"
              >
                Enviar Mensaje
              </v-btn>

            </v-form>
          </v-card-text>

        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "SendEmailView",
  data() {
    return {
      email: {
        Destinatario: "",
        Asunto: "",
        Mensaje: ""
      }
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await fetch("http://localhost:49986/Enviar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.email)
        });

        if (!response.ok) throw new Error("Error al enviar mensaje");

        alert("Mensaje enviado correctamente 🏀🔥");
        this.email = { Destinatario: "", Asunto: "", Mensaje: "" };

      } catch (error) {
        alert("Hubo un error al enviar el mensaje");
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
/* Fuente deportiva estilo NBA */
h2 {
  font-family: "Anton", sans-serif;
  letter-spacing: 1px;
}
</style>