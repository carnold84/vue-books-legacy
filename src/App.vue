<template>
    <div id="app">
        <router-view />
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
a:hover {
    color: #e98400;
}
button {
    font-family: 'Roboto Condensed', Helvetica, Arial, sans-serif;
}
.svg-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;
}
.svg-fill {
    fill: currentColor;
    stroke: none;
}
#app {
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: 'Roboto Condensed', Helvetica, Arial, sans-serif;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.8);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
}
.page {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
    flex-direction: column;
    display: flex;
}
.anim-section {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
    transition: transform 350ms ease-out, opacity 350ms ease-out;
}
.show .anim-section {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}
</style>
