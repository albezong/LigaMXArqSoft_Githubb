<template>
  <router-view />
  <!-- <Login/> -->
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

<style scoped></style>