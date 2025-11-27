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

            <template v-for="item in filteredNav" :key="item.text">

                <!-- ITEM NORMAL -->
                <v-btn v-if="!item.children" variant="text" class="mx-2 text-white" @click="navigate(item)">
                    {{ item.text }}
                </v-btn>

                <!-- ITEM CON SUBMENÚ -->
                <v-menu v-else>
                    <template #activator="{ props }">
                        <v-btn v-bind="props" variant="text" class="mx-2 text-white">
                            {{ item.text }} <v-icon end>mdi-menu-down</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item v-for="sub in item.children" :key="sub.text" @click="navigate(sub)">
                            {{ sub.text }}
                        </v-list-item>
                    </v-list>
                </v-menu>

            </template>

        </div>

        <!-- Mobile button -->
        <v-btn icon class="d-flex d-md-none" @click="drawer = true">
            <v-icon>mdi-menu</v-icon>
        </v-btn>

    </v-app-bar>

    <!-- Mobile drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right">

        <v-list>

            <!-- Recorrido principal -->
            <template v-for="item in filteredNav">

                <!-- ITEM SIN SUBMENÚ -->
                <v-list-item v-if="!item.children" :key="item.text" @click="navigateMobile(item)">
                    <template #prepend>
                        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    </template>

                    {{ item.text }}
                </v-list-item>

                <!-- ITEM CON SUBMENÚ (ACORDEÓN) -->
                <v-list-group v-else:key="item.text" prepend-icon="mdi-chevron-down">
                    <template #activator="{ props }">
                        <v-list-item v-bind="props">
                            <template #prepend>
                                <v-icon>{{ item.icon }}</v-icon>
                            </template>
                            {{ item.text }}
                        </v-list-item>
                    </template>

                    <!-- SUB MENÚ -->
                    <v-list-item v-for="sub in item.children" :key="sub.text" @click="navigateMobile(sub)">
                        {{ sub.text }}
                    </v-list-item>

                </v-list-group>

            </template>

        </v-list>

    </v-navigation-drawer>

</template>



<script>
import { ref, computed } from "vue";
import { useUsuariosStore } from "../../stores/UsuariosStore";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const usuariosStore = useUsuariosStore();

        const drawer = ref(false);

        const nav = ref([
            { text: "Inicio", to: "/games", icon: "mdi-home" },

            { text: "Registro", to: "/registro", icon: "mdi-account-plus", guest: true },
            { text: "Login", to: "/login", icon: "mdi-login", guest: true },

            { text: "Partidos", to: "/games", icon: "mdi-basketball", auth: true },
            { text: "Posiciones", to: "/standings", icon: "mdi-podium", auth: true },
            { text: "Jugadores", to: "/players_crud_list", icon: "mdi-account", auth: true },
            { text: "Equipos", to: "/teams", icon: "mdi-account-group", auth: true },

            // --- Agrupado ---
            {
                text: "Gestiónes",
                icon: "mdi-tools",
                auth: true,
                children: [
                    { text: "Gest. Equipos", to: "/teams" },
                    { text: "Gest. Partidos", to: "/partidos_crud_view" },
                    { text: "Gest. Entrenadores", to: "/entrenadorescrud" },
                    { text: "Contáctanos", to: "/contacto" }
                ]
            }
        ]);


        // Filtrar según login
        const filteredNav = computed(() => {
            if (usuariosStore.authUser) {
                return [
                    { text: "Inicio", to: "/games", icon: "mdi-home" },
                    ...nav.value.filter(n => n.auth)
                ];
            } else {
                return nav.value.filter(n => n.guest || n.text === "Inicio");
            }
        });

        // Navegación con reglas
        const navigate = (item) => {
            if (item.text === "Inicio") {
                if (usuariosStore.authUser)
                    router.push("/games");
                else
                    router.push("/registro");

                return;
            }

            if (item.auth && !usuariosStore.authUser) {
                router.push("/registro");
                return;
            }

            router.push(item.to);
        };

        const navigateMobile = (item) => {
            navigate(item); // usa tu nav normal
            drawer.value = false; // <-- cierra el menú móvil
        };


        return { drawer, nav, filteredNav, usuariosStore, navigate, navigateMobile };
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
