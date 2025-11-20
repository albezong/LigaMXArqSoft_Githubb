<template>
  <v-app>
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Login from '../src/views/Login/LoginView.vue'
export default {
  name: 'App',
  components: {
    Login,
  },
  data: () => ({
    //
  }),
};
</script>

<!-- <style scoped></style> -->
 <style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>