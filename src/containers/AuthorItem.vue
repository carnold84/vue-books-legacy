<template>
    <list-item>
        <template slot="cell1">{{author.firstName}}</template>
        <template slot="cell2">{{author.lastName}}</template>
        <template slot="actions">
            <link-button :to="author.editUrl">Edit</link-button>
            <ui-button :onClick="onRemove">Remove</ui-button>
        </template>
    </list-item>
</template>

<script>
import ListItem from '@/components/ListItem';
import UiButton from '@/components/UiButton';
import LinkButton from '@/components/LinkButton';

export default {
    name: 'AuthorItem',
    props: {
        author: {
            type: Object,
            default: {},
        },
        onRemove: {
            type: Function,
        },
    },
    methods: {
        onRemoveClick () {
            this.onRemove(this.author.id);
        },
    },
    components: {
        ListItem,
        UiButton,
        LinkButton,
    },
};
</script>

