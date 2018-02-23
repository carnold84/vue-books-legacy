<template>
    <div id="app">
        <Loading v-if="isConfigLoading" />
        <router-view v-else />
    </div>
</template>

<script>
import store from '@/store';
import Loading from '@/components/Loading';

export default {
    components: {
        Loading,
    },
    data () {
        return store.state;
    },
    created () {
        store.init();
    },
    computed: {
        isConfigLoading () {
            return this.config === undefined;
        },
    },
};
</script>
<style lang="scss">
    @import 'main.scss';
</style>

