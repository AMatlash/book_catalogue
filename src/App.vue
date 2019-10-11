<template>
    <div id="app">
        <transition
            name="fade"
            mode="out-in"
        >
            <router-view :key="currentRoute"/>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
        currentRoute() {
            return this.$route.fullPath;
        }
    }
};
</script>

<style lang="scss">
    #app {
        display: flex;
        justify-content: center;
        max-width: 100%;
        color: #2c3e50;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .fade-enter-active {
        transition: all .35s ease-in-out;
    }

    .fade-leave-active {
        transition: all .35s ease-in-out;
    }

    .fade-enter {
        transform: translateX(-100%);
    }

    .fade-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }
</style>
