<template>
    <Page id="edit-book">
        <header-bar>
            <div class="header-content">
                <router-link to="/">Vue Books</router-link>
                <h2>/ Add Book</h2>
            </div>
        </header-bar>
        <div class="content">
            <form v-on:submit.prevent="onSubmit">
                <div class="anim-section">
                    <text-field label="Title" name="title" :value="bookData.title" />
                </div>
                <div class="anim-section authors">
                    <multi-select
                        :data="authorsData"
                        placeholder="Select Authors..."
                        :onChange="onAuthorsChange"
                        :multiple="true" />
                    <round-link-button class="add-btn" to="/add-author">
                        <svgicon name="add" width="20" height="20"></svgicon>
                    </round-link-button>
                </div>
                <div class="anim-section series">
                    <multi-select :data="seriesData" placeholder="Select Series..." :onChange="onSeriesChange" />
                    <round-link-button class="add-btn" to="/add-series">
                        <svgicon name="add" width="20" height="20"></svgicon>
                    </round-link-button>
                </div>
                <div class="anim-section">
                    <text-field label="Book Number" name="bookNumber" :value="bookData.bookNumber" />
                </div>
                <div class="buttons anim-section">
                    <ui-button :isPrimary="true" :height="32">Save Book</ui-button>
                </div>
            </form>
        </div>
    </Page>
</template>

<script>
import serialize from 'form-serialize';
import store from '@/store';
import Page from '@/components/Page';
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
        Page,
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
        bookData () {
            if (this.$route.params.id) {
                return this.books.byId[this.$route.params.id];
            } else {
                return {};
            }
        },
        authorsData () {
            let options = [];
            let bookAuthors = [];
            let values = [];

            if (this.bookData !== undefined) {
                this.authorBook.forEach(record => {
                    if (this.bookData.id === record.bookId) {
                        bookAuthors.push(record.authorId);
                    }
                });
            }
            this.authors.allIds.forEach(authorId => {
                const author = this.authors.byId[authorId];
                const authorData = {
                    ...author,
                    label: `${author.lastName}, ${author.firstName}`,
                };
                options.push(authorData);
                if (bookAuthors.includes(authorId)) {
                    values.push(authorData);
                }
            });
            this.bookAuthors = values;

            return {
                values,
                options,
            };
        },
        seriesData () {
            let options = [];
            let values = null;

            this.series.allIds.forEach(seriesId => {
                const series = this.series.byId[seriesId];
                const seriesData = {
                    ...series,
                    label: series.title,
                };
                options.push(seriesData);
                if (seriesId === this.bookData.seriesId) {
                    values = seriesData;
                }
            });
            this.bookSeries = values;

            return {
                values,
                options,
            };
        },
    },
    methods: {
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
