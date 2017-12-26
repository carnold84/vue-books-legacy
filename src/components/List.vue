<template>
    <div class="list">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'List',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
    width: 100%;
    height: 100%;
    margin: 0;
    flex-direction: column;
    display: flex;
}
</style>
