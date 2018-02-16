<template>
    <Page id="edit-series">
        <template slot="header-left">
            <router-link to="/">Vue Books</router-link>
            <h2>/ Add Series</h2>
        </template>
        <template slot="content">
            <form v-on:submit.prevent="onSubmit">
                <div class="anim-section">
                    <text-field label="Title" name="title" :value="seriesData.title" />
                </div>
                <div class="form-buttons anim-section">
                    <ui-button :height="32" :onClick="onCancel">Cancel</ui-button>
                    <ui-button :isPrimary="true" :isSubmit="true" :height="32">{{submitLabel}}</ui-button>
                </div>
            </form>
        </template>
    </Page>
</template>

<script>
import serialize from 'form-serialize';
import store from '@/store';
import Page from '@/components/Page';
import HeaderBar from '@/components/HeaderBar';
import TextField from '@/components/TextField';
import UiButton from '@/components/UiButton';

export default {
    name: 'EditSeries',
    components: {
        Page,
        HeaderBar,
        TextField,
        UiButton,
    },
    data () {
        return store.state;
    },
    mounted () {
        const els = document.querySelectorAll('.anim-section');
        els.forEach((el, i) => {
            el.style.transitionDelay = `${i * 30}ms`;
        });
        const wrapper = document.querySelector('#edit-series');
        wrapper.classList.add('show');
    },
    computed: {
        submitLabel () {
            if (this.$route.params.id) {
                return 'Save Changes';
            } else {
                return 'Create Series';
            }
        },
        seriesData () {
            if (this.$route.params.id) {
                return this.series.byId[this.$route.params.id];
            } else {
                return {};
            }
        },
    },
    methods: {
        onCancel (evt) {
            evt.preventDefault();
            this.$router.go(-1);
        },
        onSubmit (evt) {
            const data = serialize(evt.target, { hash: true });
            data.id = this.$route.params.id;
            store.addSeries(data);
            this.$router.go(-1);
        },
    },
};
</script>
