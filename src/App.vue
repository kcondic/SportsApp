<template>
  <NavigationBar />
  <main>
    <router-view />
  </main>
  <PageFooter />
</template>

<script setup>
import { ref, provide, onMounted } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import PageFooter from '@/components/PageFooter.vue';
import LeagueService from '@/services/LeagueService';
import { leagueServiceIdentifier } from '@/utils/constants';

const leagueService = ref(new LeagueService());

// Fetch and provide data here because every screen needs it
// Could have just provided the match list, but LeagueService has getMatches and getLeaderboard so providing whole service
provide(leagueServiceIdentifier, leagueService);

onMounted(async () => {
  await leagueService.value.fetchData();
});
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
