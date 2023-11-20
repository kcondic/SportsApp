<template>
  <NavigationBar />
  <main>
    <router-view />
  </main>
  <PageFooter />
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import PageFooter from '@/components/PageFooter.vue';
</script>

<style lang="scss">
@import '@/styles/normalize.scss';
@import '@/styles/index.scss';
@import '@/styles/fonts.scss';

* {
  box-sizing: border-box;
  font-family: 'Open Sans', 'sans-serif';
}

a {
  text-decoration: none;
}

body {
  padding: 60px 0 40px 0;
}
</style>
