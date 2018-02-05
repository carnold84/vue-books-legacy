<template>
    <button 
        v-if="isButton"
        v-on:click="onClick ? onClick() : ''"
        :class="{'round-button': true, 'is-primary': isPrimary }"
        :style="style">
        <slot></slot>
    </button>
    <div
        v-else
        :class="{'round-button': true, 'is-primary': isPrimary }"
        :style="style"
        v-on:click="onClick ? onClick() : ''">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'RoundButton',
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
        height: {
            type: Number,
            default: 28,
        },
    },
    computed: {
        style () {
            return {
                height: `${this.height}px`,
            };
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.round-button {
    width: 28px;
    height: 28px;
    color: rgba(0, 0, 0, 0.65);
    border: #dddddd solid 1px;
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 1px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;

    &:hover {
        color: #ffffff;
        background-color: $primary;
        border: $primary solid 1px;
        box-shadow: rgba(0, 0, 0, 0.25) 0 1px 3px;
    }
    &.is-primary {
        color: rgba(255, 255, 255, 1);
        border: $primary solid 1px;
        background-color: $primary;
        box-shadow: rgba(0, 0, 0, 0.35) 0 1px 2px;
    }
    &.is-primary:hover {
        border: #3489eb solid 1px;
        background-color: #3489eb;
        box-shadow: rgba(0, 0, 0, 0.55) 0 1px 4px;
    }
}
</style>
