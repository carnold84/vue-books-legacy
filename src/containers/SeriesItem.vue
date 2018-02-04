<template>
    <list-item>
        <template slot="cell1">
            <router-link :to="url">
                <span class="title-text">{{series.title}}</span>
            </router-link>
        </template>
        <template slot="actions">
            <link-button :to="series.editUrl">Edit</link-button>
            <ui-button :onClick="onRemoveClick">Remove</ui-button>
        </template>
    </list-item>
</template>

<script>
import ListItem from '@/components/ListItem';
import UiButton from '@/components/UiButton';
import LinkButton from '@/components/LinkButton';

export default {
    name: 'SeriesItem',
    props: {
        series: {
            type: Object,
            default: {},
        },
        onRemove: {
            type: Function,
        },
    },
    components: {
        ListItem,
        UiButton,
        LinkButton,
    },
    computed: {
        url () {
            return `/books/series/${this.series.id}`;
        },
    },
    methods: {
        onRemoveClick () {
            this.onRemove(this.series.id);
        },
    },
};
</script>

