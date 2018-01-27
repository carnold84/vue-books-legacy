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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-item {
    height: 50px;
    padding: 0 10px;
    border-bottom: #dddddd solid 1px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;
}
.list-item:first-child {
    border-top: #dddddd solid 1px;
}
.list-item a {
    height: 100%;
    margin: 0 10px 0 0;
    white-space: nowrap;
    overflow: hidden;
    flex-grow: 1;
    align-items: center;
    display: flex;
}
.list-item a:last-child {
    margin: 0;
}
.list-item .title-text {
    border-bottom-style: dotted;
    border-bottom-width: 1px;
    border-bottom-color: #1e70ce;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.list-item a:hover .title-text {
    border-bottom-color: #e98400;
}
.cell {
    height: 100%;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    align-items: center;
    display: flex;
}
.cell:nth-child(1) {
    flex-grow: 1;
}
.cell:nth-child(2) {
    flex-basis: 30%;
}
.cell:nth-child(3) {
    flex-basis: 20%;
}
.cell:nth-child(4) {
    flex-basis: 10%;
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
