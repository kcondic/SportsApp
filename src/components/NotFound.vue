<template>
    <section class="not-found">
        <img src="/Images/404.png" alt="Not found 404 image" />
    </section>
</template>

<style lang="scss" scoped>
.not-found {
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: calc(100% - 40px);
    }
}
</style>