<template>
  <v-app>
    <nav-bar-view />

    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBarView from '../src/views/NavBar/NavBarView.vue'

export default {
  name: 'App',
  components: {
    NavBarView,
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
