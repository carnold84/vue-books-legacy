<template>
    <div :id="id" class="page">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Page',
    props: {
        id: {
            type: String,
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    align-items: center;
    flex-direction: column;
    display: flex;
}
.content {
    width: 100%;
    padding: 20px 40px 0;
    justify-content: center;
    flex-direction: column;
    display: flex;
}
h1 {
    font-size: 1.1em;
    font-weight: normal;
    color: #ffffff;
    margin: 0;
}
h2 {
    font-size: 1.2em;
    font-weight: normal;
    margin: 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
</style>
