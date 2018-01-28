<template>
    <div class="tag-chip">
        <p>{{text}}</p>
    </div>
</template>

<script>
export default {
    name: 'TagChip',
    props: {
        text: {
            type: String,
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag-chip {
    height: 24px;
    margin: 0;
    padding: 0 10px;
    align-items: center;
    display: flex;
}
</style>
