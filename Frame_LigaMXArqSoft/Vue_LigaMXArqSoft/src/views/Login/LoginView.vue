<template>
    <v-app>
        <v-main>
            <v-container class="d-flex justify-center align-center" style="height: 100vh;">
                <v-card elevation="10" width="400" class="pa-6">

                    <v-toolbar flat color="primary" dark>
                        <v-toolbar-title class="d-flex justify-center align-center">Login Form</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-form class="" @submit.prevent="login">
                            <v-text-field v-model="username" label="Username" prepend-inner-icon="mdi-account"
                                required />

                            <v-text-field v-model="password" label="Password" type="password"
                                prepend-inner-icon="mdi-lock" required />

                            <v-btn type="submit" block color="primary" class="mt-4">
                                Login
                            </v-btn>
                        </v-form>
                        <br></br>
                        <br></br>

                        <v-card-text elevation="3" class="d-flex justify-center align-center" color="#f0f0f0">
                                <span>¿No tiene cuenta? <a href="/registerView"
                                        class="link text-weight-700">Inscríbase</a></span>
                        </v-card-text>
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


