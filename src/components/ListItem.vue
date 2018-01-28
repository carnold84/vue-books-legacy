<template>
    <div class="list-item">
        <div class="cell">
            <!-- <router-link :to="url"> -->
                <span>{{title}}</span>
            <!-- </router-link> -->
        </div>
        <div class="cell">
            <router-link v-if="authors" v-for="author in authors" :key="author.id" :to="author.url" :title="author.label">
                <span class="title-text">{{author.label}}</span>
            </router-link>
        </div>
        <div class="cell">
            <router-link v-if="series" :to="series.url">
                <span class="title-text">{{series.title}}</span>
            </router-link>
        </div>
        <div class="cell">
            <span v-if="bookNumber">{{`Book ${bookNumber}`}}</span>
        </div>
        <div class="actions">
            <link-button :to="editUrl">Edit</link-button>
            <ui-button :onClick="onRemove">Remove</ui-button>
        </div>
    </div>
</template>

<script>
import UiButton from '@/components/UiButton';
import LinkButton from '@/components/LinkButton';

export default {
    name: 'ListItem',
    components: {
        UiButton,
        LinkButton,
    },
    props: {
        title: String,
        url: String,
        editUrl: String,
        authors: Array,
        series: Object,
        bookNumber: String,
        onRemove: Function,
    },
};
</script>

<style lang="scss" scoped>
.list-item {
    height: 50px;
    padding: 0 10px;
    border-bottom: #dddddd solid 1px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;

    &:first-child {
        border-top: #dddddd solid 1px;
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
        flex-basis: 10%;
    }
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
        border-bottom-color: #1e70ce;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    a:hover .title-text {
        border-bottom-color: #e98400;
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
