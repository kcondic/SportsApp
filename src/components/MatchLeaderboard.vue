<template>
    <template v-if="leagueService.matchList">
        <div class="item" v-for="team in leagueService.getLeaderboard()" :key="team.teamName">{{ team.teamName }}</div>
    </template>
</template>

<script setup>
import { inject } from 'vue';
import { leagueServiceIdentifier } from '@/utils/constants';

const leagueService = inject(leagueServiceIdentifier);
</script>

<style lang="scss" scoped>
</style>