<template>
    <div id="edit-author">
        <header-bar>
            <div class="content-left">
                <router-link to="/">Vue Books</router-link>
                <h2>/ Add Author</h2>
            </div>
        </header-bar>
        <div class="content">
            <form v-on:submit.prevent="onSubmit">
                <div class="anim-section">
                    <text-field label="First Name" name="firstName" :value="authorData.firstName" />
                </div>
                <div class="anim-section">
                    <text-field label="Last Name" name="lastName" :value="authorData.lastName" />
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
    name: 'EditAuthor',
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
        const wrapper = document.querySelector('#edit-author');
        wrapper.classList.add('show');
    },
    computed: {
        submitLabel () {
            if (this.$route.params.id) {
                return 'Save Changes';
            } else {
                return 'Create Author';
            }
        },
        authorData () {
            if (this.$route.params.id) {
                return this.authorById[this.$route.params.id];
            } else {
                return {};
            }
        },
    },
    methods: {
        onSubmit (evt) {
            const data = serialize(evt.target, { hash: true });
            data.id = this.$route.params.id;
            store.addAuthor(data);
            this.$router.go(-1);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#edit-author {
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
