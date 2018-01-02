<template>
    <button 
        v-if="isButton"
        v-on:click="onClick ? onClick() : ''"
        :class="{'ui-button': true, 'is-primary': isPrimary }">
        <slot></slot>
    </button>
    <div
        v-else
        :class="{'ui-button': true, 'is-primary': isPrimary }"
        v-on:click="onClick ? onClick() : ''">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'UiButton',
    props: {
        isButton: {
            type: Boolean,
            default: true,
        },
        isPrimary: {
            type: Boolean,
            default: false,
        },
        onClick: {
            type: Function,
            default: null,
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ui-button {
    height: 24px;
    font-size: 12px;
    line-height: 15px;
    color: rgba(0, 0, 0, 0.65);
    padding: 0 10px;
    border: #dddddd solid 1px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 1px;
    cursor: pointer;
    align-items: center;
    display: flex;
}
.ui-button:hover {
    color: rgba(0, 0, 0, 0.8);
    box-shadow: rgba(0, 0, 0, 0.25) 0 1px 3px;
}
.ui-button.is-primary {
    color: rgba(255, 255, 255, 1);
    border: #1e70ce solid 1px;
    background-color: #1e70ce;
    box-shadow: rgba(0, 0, 0, 0.35) 0 1px 2px;
}
.ui-button.is-primary:hover {
    border: #3489eb solid 1px;
    background-color: #3489eb;
    box-shadow: rgba(0, 0, 0, 0.55) 0 1px 4px;
}
</style>
