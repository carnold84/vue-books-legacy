<template>
    <div class="text-field">
        <label class="label" :for="name">{{label}}</label>
        <input class="input" :id="name" type="text" :name="name" />
    </div>
</template>

<script>
export default {
    name: 'TextField',
    props: ['label', 'name'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-field {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 0 20px;
    flex-direction: column;
    display: flex;
}
.label {
    width: 100%;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);
    margin: 0 0 5px;
}
.input {
    width: 100%;
    color: rgba(0, 0, 0, 0.8);
    padding: 3px 0;
    border: none;
    border-bottom: #eeeeee solid 1px;
}
.input:focus {
    outline: none;
    border-bottom: #1e70ce solid 1px;
}
</style>
