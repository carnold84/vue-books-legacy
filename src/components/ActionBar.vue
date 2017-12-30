<template>
    <div class="action-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ActionBar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action-bar {
    width: 100%;
    height: 50px;
    font-size: 1em;
    margin: 0;
    padding: 0 40px;
    border-bottom: #dddddd solid 1px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    display: flex;
}
</style>
