<template>
    <div id="home">
        <header-bar>
            <h1>Vue Books</h1>
            <router-link to="/add-book">Add</router-link>
        </header-bar>
        <div class="content">
            <list>
                <list-item v-for="book in sortedBooks" :key="book.id" :book="book" :onRemove="onRemove" />
            </list>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import HeaderBar from '@/components/HeaderBar';
import List from '@/components/List';
import ListItem from '@/components/ListItem';

export default {
    name: 'Home',
    data () {
        return store.state;
    },
    components: {
        HeaderBar,
        List,
        ListItem,
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
                    authors: this.getAuthors(data),
                    series: this.getSeries(data),
                    url: this.getUrl(data),
                };
                if (author) {
                    author = book.authors.find(element => {
                        return element.id === author.id;
                    });
                    if (author) {
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
        onRemove (data) {
            store.removeBook(data);
        },
        getUrl (book) {
            return `/book/${book.id}`;
        },
        getAuthors (book) {
            const authorIds = [];
            this.booksAuthors.forEach(function (record) {
                if (record.book === book.id) {
                    authorIds.push(record.author);
                }
            });
            const authors = this.authors.filter(function (author) {
                return authorIds.includes(author.id);
            });

            let authorObjects = [];
            if (authors) {
                authors.forEach(function (author) {
                    let values = [];
                    if (author.lastName) {
                        values.push(author.lastName);
                    }
                    if (author.firstName) {
                        values.push(author.firstName);
                    }
                    authorObjects.push({
                        id: author.id,
                        name: values.join(', '),
                        url: `/author/${author.id}`,
                    });
                });
            }
            return authorObjects;
        },
        getSeries (book) {
            let series;
            if (book.series) {
                series = this.series.filter(function (record) {
                    return record.id === book.series;
                });
                series = series ? series[0] : undefined;
            }

            if (series) {
                return {
                    id: series.id,
                    title: series.title,
                    url: `/series/${book.series}`,
                };
            }

            return series;
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
h1 {
    font-weight: 700;
    font-size: 1em;
    color: #1e70ce;
}
h2 {
    font-weight: 700;
    font-size: 1em;
    margin: 0 0 10px;
    color: #1e70ce;
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
