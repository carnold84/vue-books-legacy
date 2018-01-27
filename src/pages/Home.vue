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
                    <round-link-button to="/add-book">
                        <svgicon name="add" width="20" height="20"></svgicon>
                    </round-link-button>
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
import HeaderBar from '@/components/HeaderBar';
import ActionBar from '@/components/ActionBar';
import ContentMessage from '@/components/ContentMessage';
import LinkButton from '@/components/LinkButton';
import RoundLinkButton from '@/components/RoundLinkButton';
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
        RoundLinkButton,
    },
    computed: {
        sortedBooks () {
            let authorId;
            let seriesId;
            if (this.$route.name === 'Authors') {
                authorId = this.$route.params.name;
            } else if (this.$route.name === 'Series') {
                seriesId = this.$route.params.title;
            }
            let books = [];
            this.books.allIds.forEach(bookId => {
                const data = this.books.byId[bookId];
                let book = {
                    ...data,
                    authors: this.getBookAuthors(bookId),
                    series: this.getBookSeries(data.seriesId),
                    url: this.getUrl(bookId),
                    editUrl: this.getEditUrl(bookId),
                };
                if (authorId) {
                    const isByAuthor = book.authors.find(element => {
                        return element.id === authorId;
                    });
                    if (isByAuthor) {
                        books.push(book);
                    }
                } else if (seriesId) {
                    if (book.series && book.series.id === seriesId) {
                        books.push(book);
                    }
                } else {
                    books.push(book);
                }
            });
            console.log(books)

            return books;
        },
    },
    methods: {
        onRemove (id) {
            store.removeBook(id);
        },
        getUrl (bookId) {
            return `/book/${bookId}`;
        },
        getEditUrl (bookId) {
            return `/edit-book/${bookId}`;
        },
        getBookAuthors (bookId) {
            let authors = [];
            this.authorBook.forEach(record => {
                if (record.bookId === bookId) {
                    authors.push(this.authors.byId[record.authorId]);
                }
            });
            return authors;
        },
        getBookSeries (seriesId) {
            return this.series.byId[seriesId];
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
