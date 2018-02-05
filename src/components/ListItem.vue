<template>
    <div class="list-item">
        <div class="cell">
            <slot name="cell1"></slot>
        </div>
        <div class="cell">
            <slot name="cell2"></slot>
        </div>
        <div class="cell">
            <slot name="cell3"></slot>
        </div>
        <div class="cell">
            <slot name="cell4"></slot>
        </div>
        <div class="actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListItem',
};
</script>

<style lang="scss" scoped>
.list-item {
    height: 50px;
    padding: 0 10px;
    border-bottom: #eeeeee solid 1px;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;

    &:first-child {
        border-top: #eeeeee solid 1px;
    }
}
.cell {
    height: 100%;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    align-items: center;
    display: flex;

    &:nth-child(1) {
        flex-grow: 1;
    }
    &:nth-child(2) {
        flex-basis: 30%;
    }
    &:nth-child(3) {
        flex-basis: 20%;
    }
    &:nth-child(4) {
        flex-basis: 15%;
    }
}
.actions {
    padding: 0 0 0 10px;
    align-items: center;
    flex-shrink: 1;
    display: flex;
}
.actions > * {
    margin: 0 10px 0 0;
}
.actions > :last-child {
    margin: 0;
}
</style>
<style lang="scss">
.list-item {
    .cell {
        a {
            height: 100%;
            margin: 0 10px 0 0;
            white-space: nowrap;
            overflow: hidden;
            align-items: center;
            display: flex;
        }
        a:last-child {
            margin: 0;
        }
        .title-text {
            border-bottom-style: dotted;
            border-bottom-width: 1px;
            border-bottom-color: $primary;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        a:hover .title-text {
            border-bottom-color: $secondary;
        }
    }
}
</style>
