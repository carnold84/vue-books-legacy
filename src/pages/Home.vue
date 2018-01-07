<template>
    <div id="home">
        <header-bar>
            <h1>Vue Books</h1>
        </header-bar>
        <div class="content">
            <action-bar :hasBorder="sortedBooks.length === 0">
                <div class="action-bar-content">
                    <h2>Books</h2>
                </div>
                <div class="action-bar-actions">
                    <router-link class="round-button" :to="'/add-book'">
                        <svgicon name="add" width="20" height="20"></svgicon>
                    </router-link>
                </div>
            </action-bar>
            <list v-if="sortedBooks.length > 0">
                <list-item-container v-for="book in sortedBooks" :key="book.id" :book="book" :onRemove="onRemove" />
            </list>
            <content-message v-if="sortedBooks.length === 0">
                <p>You don't have any books yet.</p>
                <link-button to="/add-book">Add One</link-button>
            </content-message>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import {getAuthors, getSeries} from '@/utils/book';
import HeaderBar from '@/components/HeaderBar';
import ActionBar from '@/components/ActionBar';
import ContentMessage from '@/components/ContentMessage';
import LinkButton from '@/components/LinkButton';
import List from '@/components/List';
import ListItemContainer from '@/containers/ListItem';
import '@/compiled-icons/add';

export default {
    name: 'Home',
    data () {
        return store.state;
    },
    components: {
        HeaderBar,
        ActionBar,
        ContentMessage,
        List,
        ListItemContainer,
        LinkButton,
    },
    computed: {
        sortedBooks () {
            let author;
            let series;
            if (this.$route.name === 'Authors') {
                author = this.authors.find(element => {
                    return this.$route.params.name === element.id;
                });
            } else if (this.$route.name === 'Series') {
                series = this.series.find(element => {
                    return this.$route.params.title === element.id;
                });
            }
            let books = [];
            this.books.forEach(bookId => {
                const data = this.booksById[bookId];
                let book = {
                    id: data.id,
                    title: data.title,
                    authors: getAuthors(data, this.authors, this.booksAuthors),
                    series: getSeries(data, this.series, this.booksSeries),
                    bookNumber: data.bookNumber,
                    url: this.getUrl(data),
                    editUrl: this.getEditUrl(data),
                };
                if (author) {
                    const isByAuthor = book.authors.find(element => {
                        return element.id === author.id;
                    });
                    if (isByAuthor) {
                        books.push(book);
                    }
                } else if (series) {
                    if (book.series && book.series.id === series.id) {
                        books.push(book);
                    }
                } else {
                    books.push(book);
                }
            });

            return books;
        },
    },
    methods: {
        onRemove (id) {
            store.removeBook(id);
        },
        getUrl (book) {
            return `/book/${book.id}`;
        },
        getEditUrl (book) {
            return `/edit-book/${book.id}`;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home {
    align-items: center;
    flex-direction: column;
    display: flex;
}
.content {
    width: 100%;
    padding: 20px 40px 0;
    justify-content: center;
    flex-direction: column;
    display: flex;
}
.round-button {
    width: 28px;
    height: 28px;
    color: rgba(0, 0, 0, 0.65);
    border: #dddddd solid 1px;
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 1px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
}
.round-button:hover {
    color: #ffffff;
    background-color: #1e70ce;
    border: #1e70ce solid 1px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 1px 3px;
}
h1 {
    font-size: 1.1em;
    font-weight: normal;
    color: #ffffff;
    margin: 0;
}
h2 {
    font-size: 1.2em;
    font-weight: normal;
    margin: 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
</style>
