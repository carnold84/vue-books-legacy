<template>
    <list-item>
        <template slot="cell1">{{book.title}}</template>
        <template slot="cell2">
            <router-link v-if="authors" v-for="author in authors" :key="author.key" :to="author.url" :title="author.label">
                <span class="title-text">{{author.label}}</span>
            </router-link>
        </template>
        <template slot="cell3">
            <router-link v-if="series" :to="series.url">
                <span class="title-text">{{series.title}}</span>
            </router-link>
        </template>
        <template slot="cell4" v-if="book.bookNumber">{{`Book ${book.bookNumber}`}}</template>
        <template slot="actions">
            <link-button :to="book.editUrl">Edit</link-button>
            <ui-button :onClick="onRemoveClick">Remove</ui-button>
        </template>
    </list-item>
</template>

<script>
import ListItem from '@/components/ListItem';
import UiButton from '@/components/UiButton';
import LinkButton from '@/components/LinkButton';

export default {
    name: 'BookItem',
    props: {
        book: {
            type: Object,
            default: {},
        },
        onRemove: {
            type: Function,
        },
    },
    methods: {
        onRemoveClick () {
            this.onRemove(this.book.id);
        },
    },
    components: {
        ListItem,
        UiButton,
        LinkButton,
    },
    computed: {
        authors () {
            return this.book.authors.map(author => {
                return {
                    ...author,
                    key: `${this.book.id}-${author.id}`,
                    label: `${author.lastName}, ${author.firstName}`,
                    url: `/books/author/${author.id}`,
                };
            });
        },
        series () {
            let series = null;
            if (this.book.series) {
                series = {
                    ...this.book.series,
                    url: `/books/series/${this.book.series.id}`,
                };
            }
            return series;
        },
    },
};
</script>

