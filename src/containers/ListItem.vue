<template>
    <list-item 
        :title="book.title"
        :url="book.url"
        :editUrl="book.editUrl"
        :authors="book.authors"
        :series="book.series"
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
            this.onRemove(this.book);
        },
    },
    components: {
        ListItem,
    },
};
</script>
