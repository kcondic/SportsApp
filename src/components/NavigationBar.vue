<template>
    <nav class="header">
        <router-link to="/">
            <img class="logo" src="/Images/logo.svg" alt="League web home" />
        </router-link>
        <div class="header-navigation">
            <router-link to="/schedule" class="header-navigation-link">
                <img src="/Images/schedule.png" alt="Schedule image" />
                <span>Schedule</span>
            </router-link>
            <router-link to="/leaderboard" class="header-navigation-link">
                <img src="/Images/leaderboard.png" alt="Leaderboard image" />
                <span>Leaderboard</span>
            </router-link>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 0 40px;
    background-color: $header-background;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 110px;
    }

    &-navigation {
        display: flex;
        height: 100%;

        &-link {
            display: flex;
            align-items: center;
            transition: background-color ease-in-out .5s;

            img {
                height: 25px;
                margin-right: 8px;
            }

            span {
                color: $header-text;
                font-size: $menu-font-size;

                @media screen and (max-width: 480px) {
                    display: none;
                }
            }

            &:first-of-type {
                margin-right: 40px;

                @media screen and (max-width: 480px) {
                    margin-right: 15px;
                }
            }

            &:hover {
                background-color: color.scale($header-background, $lightness: -30%);
            }
        }
    }

    @media screen and (max-width: 480px) {
        padding: 0 20px;
    }
}
</style>