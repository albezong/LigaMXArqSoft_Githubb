<template>
    <v-app-bar color="black" density="comfortable" class="px-5">

        <!-- LOGO -->
        <img src="../../../public/img/LogoBBMX.jpeg" alt="" width="50" height="50" class="rounded-circle cover">



        <!-- TÍTULO -->
        <v-app-bar-title class="text-h6">
            <a href="/" class="text-weight-700 no-underline text-white">Liga Basquetbol MX</a>
        </v-app-bar-title>

        <!-- Desktop menu -->
        <div class="d-none d-md-flex">
            <v-btn v-for="item in nav" :key="item.text" variant="text" :to="item.to" class="mx-2 text-white">
                {{ item.text }}
            </v-btn>
        </div>

        <!-- Mobile button -->
        <v-btn icon class="d-flex d-md-none" @click="drawer = true">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-app-bar>

    <!-- Mobile drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right">
        <v-list>
            <v-list-item v-for="item in nav" :key="item.text" :title="item.text" :to="item.to">
                <template #prepend>
                    <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                </template>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<script>
//import Logo from "@/img/1035968";

export default {
    data() {
        return {
            drawer: false,
            nav: [
                { text: "Inicio", to: "/", icon: "mdi-home" },
                // { text: "Jugadores", to: "/jugadores", icon: "mdi-basketball" },
                { text: "Registro", to: "/registro", icon: "mdi-account-plus" },
                { text: "Login", to: "/login", icon: "mdi-login" },
            ],
        };
    },
};
</script>

<style>
.text-white {
    color: #ffffff;
}

.no-underline {
    text-decoration: none !important;
}
</style>
