<template>
    <section class="leaderboard">
        <div class="leaderboard-title">
            League Standings
        </div>
        <div class="leaderboard-table" v-if="leagueService.matchList">
            <div class="leaderboard-table-header">
                <div class="leaderboard-table-header-team">Team Name</div>
                <div class="leaderboard-table-header-statistic">MP</div>
                <div class="leaderboard-table-header-statistic">GF</div>
                <div class="leaderboard-table-header-statistic">GA</div>
                <div class="leaderboard-table-header-points">Points</div>
            </div>
            <template v-if="leagueService.matchList.length">
                <div class="leaderboard-table-item" v-for="team in leagueService.getLeaderboard()" :key="team.teamName">
                    <div class="leaderboard-table-item-team">
                        <img class="flag" :src="'https://flagsapi.codeaid.io/' + team.teamName + '.png'" :alt="team.teamName + ' flag'" />
                        <div class="leaderboard-table-item-team-name">{{ team.teamName }}</div>
                    </div>
                    <div class="leaderboard-table-item-statistics-item">{{ team.matchesPlayed }}</div>
                    <div class="leaderboard-table-item-statistics-item">{{ team.goalsFor }}</div>
                    <div class="leaderboard-table-item-statistics-item">{{ team.goalsAgainst }}</div>
                    <div class="leaderboard-table-item-points">{{ team.points }}</div>
                </div>
            </template>
            <div class="indicator" v-else>
                No matches.
            </div>
        </div>
        <div class="indicator" v-else>
            Loading...
        </div>
    </section>
</template>

<script setup>
import { inject } from 'vue';
import { leagueServiceIdentifier } from '@/utils/constants';

const leagueService = inject(leagueServiceIdentifier);
</script>

<style lang="scss" scoped>
.leaderboard {
    margin-top: 60px;

    .indicator {
        margin-top: 20px;
    }

    &-title {
        margin-bottom: 20px;
    }

    .indicator, &-title {
        text-align: center;
        color: $heading-text;
        font-size: $heading-font-size;
    }

    &-table {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        padding-bottom: 20px;
        font-size: $table-header-font-size;
        color: $table-text;

        &-header {
            display: flex;
            align-items: center;
            height: 40px;
            background-color: $table-background-border;
            padding: 0 20px;
            font-weight: 700;

            &-team {
                width: 60%;
            }

            &-statistic {
                width: 8%;
                text-align: center;
            }

            &-points {
                width: 16%;
                text-align: center;
            }
        }

        &-item {
            height: 70px;
            display: flex;
            align-items: center;
            font-size: $table-cell-font-size;
            color: $table-text;
            border-top: 1px solid $table-background-border;
            padding: 0 20px;

            &-team {
                display: flex;
                align-items: center;
                width: 60%;
   
                .flag {
                    width: 53px;
                    height: 37px;
                    margin-right: 12px;
                }

                &-name {
                    font-size: $table-cell-bolded-font-size;
                    font-weight: 700;
                }
            }

            &-statistics-item {
                width: 8%;
                text-align: center;
            }

            &-points {
                width: 16%;
                text-align: center;
                font-size: $table-cell-bolded-font-size;
                font-weight: 700;
                color: $points-text;
            }
        }
    }
}
</style>