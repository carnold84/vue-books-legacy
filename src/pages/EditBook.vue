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
                <div class="anim-section authors">
                    <multi-select
                        :items="authorsData.options"
                        placeholder="Select Authors..."
                        :onChange="onAuthorsChange"
                        :multiple="true" />
                    <round-link-button class="add-btn" to="/add-author">
                        <svgicon name="add" width="20" height="20"></svgicon>
                    </round-link-button>
                </div>
                <div class="anim-section series">
                    <multi-select :items="seriesData.options" placeholder="Select Series..." :onChange="onSeriesChange" />
                    <round-link-button class="add-btn" to="/add-series">
                        <svgicon name="add" width="20" height="20"></svgicon>
                    </round-link-button>
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
import HeaderBar from '@/components/HeaderBar';
import TextField from '@/components/TextField';
import UiButton from '@/components/UiButton';
import MultiSelect from '@/components/MultiSelect';
import RoundLinkButton from '@/components/RoundLinkButton';
import TagChip from '@/components/TagChip';
import '@/compiled-icons/add';

export default {
    name: 'EditBook',
    components: {
        HeaderBar,
        TextField,
        UiButton,
        MultiSelect,
        RoundLinkButton,
        TagChip,
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
            let book = this.getBook();
            return book !== undefined ? book : {};
        },
        authorsData () {
            return {
                value: this.book ? this.book.authors : null,
                options: this.authors.allIds.map(authorId => {
                    const author = this.authors.byId[authorId];
                    return {
                        ...author,
                        label: `${author.lastName}, ${author.firstName}`,
                    };
                }),
            };
        },
        seriesData () {
            return {
                value: this.book ? this.book.series : null,
                options: this.series.allIds.map(seriesId => {
                    const series = this.series.byId[seriesId];
                    return {
                        ...series,
                        label: series.title,
                    };
                }),
            };
        },
    },
    methods: {
        getBook () {
            let book;

            if (this.$route.params.id) {
                const data = this.books.byId[this.$route.params.id];
                book = {
                    id: data.id,
                    title: data.title,
                    bookNumber: data.bookNumber,
                };
            }

            return book;
        },
        onAuthorsChange (authors) {
            this.bookAuthors = authors;
        },
        onSeriesChange (series) {
            this.bookSeries = series;
        },
        onSubmit (evt) {
            const data = serialize(evt.target, { hash: true });
            data.id = this.$route.params.id;
            data.authors = this.bookAuthors.map(author => {
                return author.id;
            });
            data.seriesId = this.bookSeries ? this.bookSeries.id : undefined;
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
.authors {
    position: relative;
    margin: 0 0 20px;
    align-items: center;
    display: flex;
    z-index: 10;
}
.series {
    position: relative;
    margin: 0 0 20px;
    align-items: center;
    display: flex;
    z-index: 9;
}
.add-btn {
    margin: 0 0 0 10px;
}
</style>
