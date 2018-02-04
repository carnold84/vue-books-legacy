<template>
    <list-item>
        <template slot="cell1">
            <router-link :to="url">
                <span class="title-text">{{name}}</span>
            </router-link>
        </template>
        <template slot="actions">
            <link-button :to="author.editUrl">Edit</link-button>
            <ui-button :onClick="onRemoveClick">Remove</ui-button>
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
    computed: {
        name () {
            let names = [];
            if (this.author.lastName) {
                names.push(this.author.lastName);
            }
            if (this.author.firstName) {
                names.push(this.author.firstName);
            }
            return names.join(', ');
        },
        url () {
            return `/books/author/${this.author.id}`;
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

