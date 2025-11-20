<template>
  <v-app>
    <v-main>
      <v-container 
        class="d-flex justify-center align-center"
        style="height: 100vh;"
      >
        <v-card width="400" elevation="10" class="pa-6" color="#f0f0f0">
          
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title class="d-flex justify-center align-center">Register</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" @submit.prevent="register">

              <v-text-field
                v-model="username"
                label="Username"
                prepend-inner-icon="mdi-account"
                required
              />

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                required
              />

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                prepend-inner-icon="mdi-lock-check"
                required
              />

              <div class="text-red mt-2">{{ errorMessage }}</div>

              <v-btn 
                type="submit"
                color="primary"
                block
                class="mt-4"
              >
                Register
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
      } 
      else {
        this.errorMessage = "Passwords do not match.";
      }
    }
  }
};
</script>
