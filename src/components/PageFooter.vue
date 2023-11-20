<template>
    <footer>
        API Version: 
        <template v-if="version">
            {{ version }}
        </template>
        <template v-else>
            Loading...
        </template>
    </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getApiVersion } from '@/services/api-service';

const version = ref(null);

onMounted(async () => {
    let apiVersion = await getApiVersion();
    
    if (apiVersion && apiVersion.version)
        version.value = apiVersion.version;
    else
        version.value = 'Unknown';
});
</script>

<style lang="scss" scoped>
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding-right: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: $footer-background;
    color: $footer-text;
    font-size: $footer-font-size;
    font-weight: 700;
}
</style>