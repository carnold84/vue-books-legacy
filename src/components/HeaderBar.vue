<template>
    <div class="header-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-bar {
    width: 100%;
    height: 40px;
    font-size: 1em;
    color: #ffffff;
    margin: 0;
    padding: 0 40px;
    background-color: #1e70ce;
    border-bottom: #1e70ce solid 1px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 1px 2px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    display: flex;
}
.header-bar a {
    color: #ffffff;
}
</style>
