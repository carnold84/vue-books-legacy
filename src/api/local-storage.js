import uuid from 'uuid/v4';

// localStorage.removeItem('vue-books');
let state = localStorage.getItem('vue-books');

if (state === null) {
    state = {
        books: {
            allIds: [],
            byId: {},
        },
        authors: {
            allIds: [],
            byId: {},
        },
        authorBook: [],
        series: {
            allIds: [],
            byId: {},
        },
        seriesBook: [],
    };
    state = {
        books: {
            allIds: ['book-1', 'book-2'],
            byId: {
                'book-1': {
                    id: 'book-1',
                    title: 'The Spy Who Read Me',
                    seriesId: 'series-1',
                    bookNumber: '1',
                },
                'book-2': {
                    id: 'book-2',
                    title: 'Harry Booker and the Editor\'s Stone',
                    seriesId: 'series-2',
                    bookNumber: '1',
                },
            },
        },
        authors: {
            allIds: ['author-1', 'author-2'],
            byId: {
                'author-1': {
                    id: 'author-1',
                    firstName: 'John',
                    lastName: 'Le Booker',
                },
                'author-2': {
                    id: 'author-2',
                    firstName: 'J.K.',
                    lastName: 'Booking',
                },
            },
        },
        authorBook: [
            {
                id: '1',
                bookId: 'book-1',
                authorId: 'author-1',
            },
            {
                id: '2',
                bookId: 'book-2',
                authorId: 'author-2',
            },
        ],
        series: {
            allIds: ['series-1', 'series-2'],
            byId: {
                'series-1': {
                    id: 'series-1',
                    title: 'The Spy Catcher',
                },
                'series-2': {
                    id: 'series-2',
                    title: 'The Harry Booker Chronicles',
                },
            },
        },
    };
} else {
    state = JSON.parse(state);
}

export default {
    getAllData (callback) {
        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
    addBook (data, callback) {
        let book = {
            id: data.id ? data.id : uuid(),
            title: data.title,
            seriesId: data.seriesId,
            bookNumber: data.bookNumber,
        };
        let idx = state.books.allIds.indexOf(book.id);
        if (idx > -1) {
            state.books.allIds[idx] = book.id;
        } else {
            state.books.allIds.push(book.id);
        }
        state.books.byId[book.id] = book;

        this.linkAuthors(book.id, data.authors);

        updateStorage(state);

        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
    removeBook (id, callback) {
        // remove from order
        state.books.allIds.splice(state.books.allIds.indexOf(id), 1);
        // remove from lookup
        delete state.books.byId[id];
        // remove any links to authors
        state.authorBook = state.authorBook.filter(record => {
            return record.bookId !== id;
        });
        updateStorage(state);

        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
    unlinkAuthors (bookId) {
        state.authorBook = state.authorBook.filter(record => {
            return record.bookId !== bookId;
        });
    },
    linkAuthors (bookId, authors) {
        // remove existing links first
        this.unlinkAuthors(bookId);
        authors.forEach(authorId => {
            state.authorBook.push({
                id: uuid(),
                bookId,
                authorId,
            });
        });
    },
    addAuthor (data, callback) {
        let author = createAuthor(data);
        let idx = state.authors.allIds.indexOf(author.id);
        if (idx > -1) {
            state.authors.allIds[idx] = author.id;
        } else {
            state.authors.allIds.push(author.id);
        }
        state.authors.byId[author.id] = author;

        updateStorage(state);

        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
    removeAuthor (id, callback) {
        // remove from order
        state.authors.allIds.splice(state.authors.allIds.indexOf(id), 1);
        // remove from lookup
        delete state.authors.byId[id];
        // remove any links to books
        state.authorBook = state.authorBook.filter(record => {
            return record.authorId !== id;
        });
        updateStorage(state);

        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
    addSeries (data, callback) {
        let series = createSeries(data);
        let idx = state.series.allIds.indexOf(series.id);
        if (idx > -1) {
            state.series.allIds[idx] = series.id;
        } else {
            state.series.allIds.push(series.id);
        }
        state.series.byId[series.id] = series;

        updateStorage(state);

        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
    removeSeries (id, callback) {
        // remove from order
        state.series.allIds.splice(state.series.allIds.indexOf(id), 1);
        // remove from lookup
        delete state.series.byId[id];

        updateStorage(state);

        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
};

const updateStorage = state => {
    localStorage.setItem('vue-books', JSON.stringify(state));
};

const createAuthor = data => {
    let author = {
        id: data.id ? data.id : uuid(),
    };
    if (data.firstName) {
        author.firstName = data.firstName;
    }
    if (data.lastName) {
        author.lastName = data.lastName;
    }
    return author;
};

const createSeries = data => {
    let series = {
        id: data.id ? data.id : uuid(),
    };
    if (data.title) {
        series.title = data.title;
    }
    return series;
};
