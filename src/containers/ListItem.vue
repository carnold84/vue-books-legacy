<template>
    <list-item 
        :title="book.title"
        :url="book.url"
        :editUrl="book.editUrl"
        :authors="authors"
        :series="series"
        :bookNumber="book.bookNumber"
        :onRemove="onRemoveClick"
    />
</template>

<script>
import ListItem from '@/components/ListItem';

export default {
    name: 'ListItemContainer',
    props: ['book', 'onRemove'],
    methods: {
        onRemoveClick () {
            this.onRemove(this.book.id);
        },
    },
    components: {
        ListItem,
    },
    computed: {
        authors () {
            return this.book.authors.map(author => {
                return {
                    ...author,
                    url: `/author/${author.id}`,
                };
            });
        },
        series () {
            return {
                ...this.book.series,
                url: `/series/${this.book.series.id}`,
            };
        },
    },
};
</script>
