<template>
    <div id="edit-series">
        <header-bar>
            <div class="content-left">
                <router-link to="/">Vue Books</router-link>
                <h2>/ Add Series</h2>
            </div>
        </header-bar>
        <div class="content">
            <form v-on:submit.prevent="onSubmit">
                <div class="anim-section">
                    <text-field label="Title" name="title" :value="seriesData.title" />
                </div>
                <div class="buttons anim-section">
                    <ui-button :isPrimary="true" :height="32">{{submitLabel}}</ui-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import serialize from 'form-serialize';
import store from '@/store';
import HeaderBar from '@/components/HeaderBar';
import TextField from '@/components/TextField';
import UiButton from '@/components/UiButton';

export default {
    name: 'EditSeries',
    components: {
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
        onSubmit (evt) {
            const data = serialize(evt.target, { hash: true });
            data.id = this.$route.params.id;
            store.addSeries(data);
            this.$router.go(-1);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#edit-series {
    align-items: center;
    flex-direction: column;
    display: flex;
}
.content {
    max-width: 1080px;
    width: 100%;
    padding: 40px 40px 0;
    flex-direction: column;
    display: flex;
}
.buttons {
    width: 100%;
    justify-content: flex-end;
    display: flex;
}
</style>
