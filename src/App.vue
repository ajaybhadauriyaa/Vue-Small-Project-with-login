<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './layout/TheHeader.vue';
export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Poppins', sans-serif;
}
</style>
