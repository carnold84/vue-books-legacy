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
<style lang="scss" scoped>
.header-bar {
    width: 100%;
    height: 50px;
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

    a {
        color: #ffffff;
    }

    .content-left {
        align-items: center;
        display: flex;

        h1, h2 {
            font-size: 1em;
            font-weight: normal;
            margin: 0;
        }

        a {
            border-bottom: #ffffff dotted 1px;
            margin: 1px 5px 0 0;
        }

        a:hover {
            color: #e98400;
            border-bottom: #e98400 dotted 1px;
            margin: 1px 5px 0 0;
        }
    }
}
</style>
