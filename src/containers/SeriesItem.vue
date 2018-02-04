<template>
    <list-item>
        <template slot="cell1">{{series.title}}</template>
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
    methods: {
        onRemoveClick () {
            this.onRemove(this.series.id);
        },
    },
    components: {
        ListItem,
        UiButton,
        LinkButton,
    },
};
</script>

