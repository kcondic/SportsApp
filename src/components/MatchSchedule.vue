<template>
    <section class="schedule">
        <div class="schedule-title">
            League Schedule
        </div>
        <div class="schedule-table" v-if="leagueService.matchList">
            <div class="schedule-table-header">
                <div class="schedule-table-header-date">Date/Time</div>
                <div class="schedule-table-header-stadium">Stadium</div>
                <div class="schedule-table-header-teams">
                    <div>Home Team</div>
                    <div>Away Team</div>
                </div>
            </div>
            <template v-if="leagueService.matchList.length">
                <div class="schedule-table-item" v-for="match in leagueService.matchList" :key="match.matchDate">
                    <div class="schedule-table-item-date">
                        <div>{{ getReadableDate(match.matchDate) }}</div>
                        <div>{{ getReadableTime(match.matchDate) }}</div>
                    </div>
                    <div class="schedule-table-item-stadium">{{  match.stadium ?? '-' }}</div>
                    <div class="schedule-table-item-teams-and-result">
                        <div class="schedule-table-item-teams-and-result-team home">
                            <div class="schedule-table-item-teams-and-result-team-name">{{ match.homeTeam }}</div>
                            <img class="flag" :src="'https://flagsapi.codeaid.io/' + match.homeTeam + '.png'" :alt="match.homeTeam + ' flag'" />
                        </div>
                        <div class="schedule-table-item-teams-and-result-result">
                            {{ match.matchPlayed ? `${ match.homeTeamScore } : ${ match.awayTeamScore }` : '- : -' }}
                        </div>
                        <div class="schedule-table-item-teams-and-result-team away">
                            <img class="flag" :src="'https://flagsapi.codeaid.io/' + match.awayTeam + '.png'" :alt="match.awayTeam + ' flag'" />
                            <div class="schedule-table-item-teams-and-result-team-name">{{ match.awayTeam }}</div>
                        </div>
                    </div>
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

function getReadableDate(unixTimestamp) {
    let date = new Date(unixTimestamp);

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function getReadableTime(unixTimestamp) {
    let date = new Date(unixTimestamp);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}
</script>

<style lang="scss" scoped>
.schedule {
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
            font-weight: 700;

            &-date {
                width: 10%;
                padding-right: 40px;
                text-align: end;

                @media screen and (max-width: 1200px) {
                    width: 15%;
                }

                @media screen and (max-width: 768px) {
                    padding-right: 0;
                }

                @media screen and (max-width: 680px) {
                    display: none;
                }
            }

            &-stadium {
                width: 20%;

                @media screen and (max-width: 1200px) {
                    width: 15%;
                }

                @media screen and (max-width: 968px) {
                    display: none;
                }
            }

            &-teams {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 70%;

                div {
                    width: calc(50% - 60px);

                    @media screen and (max-width: 768px) {
                        width: calc(50% - 30px);
                    }

                    @media screen and (max-width: 680px) {
                        width: 50%;
                    }
                }

                div:first-of-type {
                    margin-right: 120px;
                    text-align: end;

                    @media screen and (max-width: 768px) {
                        margin-right: 60px;
                    }
                }

                @media screen and (max-width: 968px) {
                    width: 80%;
                }

                @media screen and (max-width: 680px) {
                    width: 100%;
                }
            }
        }

        &-item {
            height: 70px;
            display: flex;
            align-items: center;
            font-size: $table-cell-font-size;
            color: $table-text;
            border-top: 1px solid $table-background-border;

            &:nth-of-type(2n+1) {
                background-color: $table-row-background;
            }

            &-date {
                width: 10%;
                padding-right: 40px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                div:first-of-type {
                    margin-bottom: 8px;
                }

                @media screen and (max-width: 1200px) {
                    width: 15%;
                }

                @media screen and (max-width: 768px) {
                    padding-right: 0;
                }

                @media screen and (max-width: 680px) {
                    display: none;
                }
            }

            &-stadium {
                width: 20%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 2px 0;

                @media screen and (max-width: 1200px) {
                    width: 15%;
                }

                @media screen and (max-width: 968px) {
                    display: none;
                }
            }

            &-teams-and-result {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 70%;

                &-team {
                    display: flex;
                    align-items: center;
                    width: calc(50% - 60px);

                    &-name {
                        font-size: $table-cell-bolded-font-size;
                        font-weight: 700;

                        @media screen and (max-width: 480px) {
                            font-size: $table-cell-bolded-font-size-small;
                        }
                    }

                    &.home {
                        justify-content: flex-end;
                    }

                    &.home &-name {
                        margin-right: 12px;
                    }
    
                    &.away &-name {
                        margin-left: 12px;
                    }
    
                    .flag {
                        width: 53px;
                        height: 37px;

                        @media screen and (max-width: 480px) {
                            width: 40px;
                            height: 28px;
                        }
                    }

                    
                    @media screen and (max-width: 768px) {
                        width: calc(50% - 30px);
                    }

                    @media screen and (max-width: 680px) {
                        width: 50%;
                    }
                }
    
                &-result {
                    font-size: $table-cell-bolded-font-size;
                    font-weight: 700;
                    width: 120px;
                    text-align: center;

                    @media screen and (max-width: 768px) {
                        width: 60px;
                    }

                    @media screen and (max-width: 480px) {
                        font-size: $table-cell-bolded-font-size-small;
                    }
                }

                @media screen and (max-width: 968px) {
                    width: 80%;
                }

                @media screen and (max-width: 680px) {
                    width: 100%;
                }
            }
        }

        @media screen and (max-width: 480px) {
            width: 100%;
        }
    }
}
</style>