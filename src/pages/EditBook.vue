<template>
    <div id="edit-book">
        <header-bar>
            <div class="header-content">
                <router-link to="/">Vue Books</router-link>
                <h2>/ Add Book</h2>
            </div>
        </header-bar>
        <div class="content">
            <form v-on:submit.prevent="onSubmit">
                <div class="anim-section">
                    <text-field label="Title" name="title" :value="book.title" />
                </div>
                <div class="anim-section">
                    <text-field label="Author's First Name" name="firstName" :value="book.firstName" />
                </div>
                <div class="anim-section">
                    <text-field label="Author's Last Name" name="lastName" :value="book.lastName" />
                </div>
                <div class="anim-section">
                    <text-field label="Series" name="series" :value="book.series" />
                </div>
                <div class="anim-section">
                    <text-field label="Book Number" name="bookNumber" :value="book.bookNumber" />
                </div>
                <div class="buttons anim-section">
                    <ui-button :isPrimary="true" :height="32">Save Book</ui-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import serialize from 'form-serialize';
import store from '@/store';
import {getAuthors, getSeries} from '@/utils/book';
import HeaderBar from '@/components/HeaderBar';
import TextField from '@/components/TextField';
import UiButton from '@/components/UiButton';

export default {
    name: 'EditBook',
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
        const wrapper = document.querySelector('#edit-book');
        wrapper.classList.add('show');
    },
    computed: {
        book () {
            let book = {};

            if (this.$route.params.id) {
                const data = this.booksById[this.$route.params.id];

                const authors = getAuthors(data, this.authors, this.booksAuthors);
                const series = getSeries(data, this.series, this.booksSeries);
                book = {
                    id: data.id,
                    title: data.title,
                    firstName: authors ? authors[0].firstName : undefined,
                    lastName: authors ? authors[0].lastName : undefined,
                    series: series ? series.title : undefined,
                    bookNumber: data.bookNumber,
                };
            }

            return book;
        },
    },
    methods: {
        onSubmit (evt) {
            const data = serialize(evt.target, { hash: true });
            data.id = this.$route.params.id;
            store.addBook(data);
            this.$router.go(-1);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#edit-book {
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
.button {
    padding: 8px 25px;
    color: #ffffff;
    background-color: #1e70ce;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
.button:hover {
    background-color: #3282df;
}
.header-content {
    align-items: center;
    display: flex;
}
.header-content h2 {
    font-size: 1em;
    font-weight: normal;
    margin: 0;
}
.header-content a {
    border-bottom: #ffffff dotted 1px;
    margin: 1px 5px 0 0;
}
.header-content a:hover {
    color: #e98400;
    border-bottom: #e98400 dotted 1px;
    margin: 1px 5px 0 0;
}
</style>
