<template>
    <div :class="{'action-bar': true, 'has-border': hasBorder}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ActionBar',
    props: {
        hasBorder: Boolean,
        default: true,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action-bar {
    width: 100%;
    height: 40px;
    font-size: 1em;
    margin: 0;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    display: flex;
}
.action-bar.has-border {
    border-bottom: #dddddd solid 1px;
}
</style>
