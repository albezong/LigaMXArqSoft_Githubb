<template>
    <v-app>
        <v-main class="bg-grey-lighten-2">

            <v-container class="py-10" style="max-width: 600px;">

                <!-- TÍTULO -->
                <h2 class="mb-2 d-flex justify-center align-center">Crea tu cuenta</h2>
                <p class="text-grey mb-6 d-flex justify-center align-center">Completa los pasos para registrarte.</p>

                <!-- BARRA DE PASOS -->
                <div class="steps-container mb-6">
                    <div v-for="n in 4" :key="n" class="step" :class="{
                        active: step === n,
                        complete: step > n
                    }">
                        {{ n }}
                    </div>
                </div>

                <!-- ANIMACIÓN ENTRE PANTALLAS -->
                <transition class="elevation-20 pt-8 mx-auto pa-12 color-fondoblanco" name="fade-slide" mode="out-in">
                    <div :key="step">

                        <!-- -------------- PANTALLA 1 ------------------ -->
                        <div v-if="step === 1" class="color-circunferencia">
                            <v-text-field label="Nombre" v-model="form.nombre" outlined />
                            <v-text-field label="Email" v-model="form.email" outlined />

                            <v-btn color="primary" block class="mt-4" rounded="xl" @click="goNext">
                                Siguiente →
                            </v-btn>
                        </div>

                        <!-- -------------- PANTALLA 2 ------------------ -->
                        <div v-else-if="step === 2">
                            <h3 class="text-white mb-4">¿Qué estilo de jugador eres?</h3>

                            <v-card :elevation="form.jugadorTipo === 'Ofensivo' ? 12 : 2"
                                class="pa-4 my-2 selectable-card" @click="form.jugadorTipo = 'Ofensivo'">
                                <strong>Ofensivo</strong>
                                <div class="text-grey">Te gusta encestar y atacar.</div>
                            </v-card>

                            <v-card :elevation="form.jugadorTipo === 'Defensivo' ? 12 : 2"
                                class="pa-4 my-2 selectable-card" @click="form.jugadorTipo = 'Defensivo'">
                                <strong>Defensivo</strong>
                                <div class="text-grey">Bloqueos, robos y defensa.</div>
                            </v-card>

                            <!-- Botones -->
                            <v-row class="mt-4">
                                <v-col cols="6">
                                    <v-btn variant="tonal" block @click="goBack">← Atrás</v-btn>
                                </v-col>

                                <v-col cols="6">
                                    <v-btn color="primary" block @click="goNext">Siguiente →</v-btn>
                                </v-col>
                            </v-row>
                        </div>

                        <!-- -------------- PANTALLA 3 ------------------ -->
                        <div v-else-if="step === 3">
                            <v-select label="Rol" v-model="form.rol" :items="['Jugador', 'Entrenador', 'Aficionado']"
                                outlined />
                            <v-text-field label="Contraseña" v-model="form.contraseña" type="password" outlined />

                            <!-- Botones -->
                            <v-row class="mt-4">
                                <v-col cols="6">
                                    <v-btn variant="tonal" block @click="goBack">← Atrás</v-btn>
                                </v-col>

                                <v-col cols="6">
                                    <v-btn color="primary" block @click="goNext">Siguiente →</v-btn>
                                </v-col>
                            </v-row>
                        </div>

                        <!-- -------------- PANTALLA 4 ------------------ -->
                        <div v-else-if="step === 4">
                            <h3 class="text-white">Confirmación</h3>
                            <p><strong>Nombre:</strong> {{ form.nombre }}</p>
                            <p><strong>Email:</strong> {{ form.email }}</p>
                            <p><strong>Tipo jugador:</strong> {{ form.jugadorTipo }}</p>
                            <p><strong>Rol:</strong> {{ form.rol }}</p>

                            <v-row class="mt-4">
                                <v-col cols="6">
                                    <v-btn variant="tonal" block @click="goBack">← Atrás</v-btn>
                                </v-col>

                                <v-col cols="6">
                                    <v-btn color="primary" block @click="register">Crear cuenta ✔</v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </transition>

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
        goNext() {
            if (this.step < 4) this.step++;
        },
        goBack() {
            if (this.step > 1) this.step--;
        },
        register() {
            alert("Registro completo");
            console.log("Datos:", this.form);
        }
    }
};
</script>

<style scoped>
.text-grey {
    color: #aaaaaa;
}

.color-circunferencia {
    color: #000000;
}

.color-fondoblanco {
    background-color: #ffffff;
}

/* ---- STEPS ---- */
.steps-container {
    display: flex;
    justify-content: space-between;
}

.step {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #64645f;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    border: 2px solid #555;
}

.step.active {
    background-color: #af1a29;
    border-color: #000;
}

.step.complete {
    background-color: #4caf50;
    border-color: #000;
}

/* ---- ANIMACIÓN ENTRE PANTALLAS ---- */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.35s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

/* Cartas seleccionables */
.selectable-card:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: 0.2s;
}
</style>
