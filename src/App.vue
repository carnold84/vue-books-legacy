<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: 'app',
    created () {
        store.init();
    },
};
</script>

<style>
*, *:before, *:after {
  box-sizing: border-box;
}
body {
    padding: 0;
    margin: 0;
}
a, a:link, a:visited {
    color: #1e70ce;
    text-decoration: none;
}
#app {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.anim-section {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
    transition: transform 500ms ease-out, opacity 500ms ease-out;
}
.show .anim-section {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}
</style>
