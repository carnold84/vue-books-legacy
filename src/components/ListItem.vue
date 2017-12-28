<template>
    <div class="list-item">
        <div class="title">
            <router-link :to="book.url">
                <span class="title-text">{{book.title}}</span>
            </router-link>
        </div>
        <div v-if="book.authors" class="author">
            <router-link v-for="author in book.authors" :key="author.id" :to="author.url">
                <span class="title-text">{{author.name}}</span>
            </router-link>
        </div>
        <div v-if="book.series" class="series">
            <router-link :to="book.series.url">
                <span class="title-text">{{book.series.title}}</span>
            </router-link>
        </div>
        <div class="actions">
            <button class="button" v-on:click="onRemoveClick">Remove</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListItem',
    props: ['book', 'onRemove'],
    methods: {
        onRemoveClick () {
            this.onRemove(this.book);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-item {
    height: 50px;
    padding: 0 20px;
    border-bottom: #dddddd solid 1px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;
}
.list-item:first-child {
    border-top: #dddddd solid 1px;
}
.list-item:hover {
    color: #ffffff;
    background-color: #1e70ce;
}
.list-item a {
    height: 100%;
    flex-grow: 1;
    align-items: center;
    display: flex;
}
.list-item .title-text {
    border-bottom-style: dotted;
    border-bottom-width: 1px;
    border-bottom-color: #1e70ce;
}
.list-item:hover a {
    color: #ffffff;
}
.list-item:hover a .title-text {
    border-bottom-color: #ffffff;
}
.title, .author, .series, .actions {
    height: 100%;
    display: flex;
}
.title {
    flex-grow: 1;
}
.author {
    flex-basis: 30%;
}
.series {
    flex-basis: 30%;
}
.actions {
    align-items: center;
    flex-shrink: 1;
}
.button {
    height: 24px;
    font-size: 12px;
    color: #ffffff;
    padding: 0 10px;
    border: #1e70ce solid 1px;
    background-color: #1e70ce;
    border-radius: 3px;
    cursor: pointer;
}
.button:hover {
    color: #1e70ce;
    border: #ffffff solid 1px;
    background-color: #ffffff;
}
</style>
