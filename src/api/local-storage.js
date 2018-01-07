import uuid from 'uuid';

// localStorage.removeItem('vue-books');
let state = localStorage.getItem('vue-books');

if (state === null) {
    state = {
        books: [],
        booksById: {},
        authors: [],
        booksAuthors: [],
        series: [],
        booksSeries: [],
    };
    /* state = {
        books: ['1', '2'],
        booksById: {
            '1': {
                id: '1',
                title: 'The Spy Who Read Me',
                bookNumber: '1',
            },
            '2': {
                id: '2',
                title: 'Harry Booker and the Editor\'s Stone',
                bookNumber: '1',
            },
        },
        authors: [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Le Booker',
            },
            {
                id: '2',
                firstName: 'J.K.',
                lastName: 'Booking',
            },
        ],
        booksAuthors: [
            {
                id: '1',
                book: '1',
                author: '1',
            },
            {
                id: '2',
                book: '2',
                author: '2',
            },
        ],
        series: [
            {
                id: '1',
                title: 'The Spy Catcher',
            },
            {
                id: '2',
                title: 'The Harry Booker Chronicles',
            },
        ],
        booksSeries: [
            {
                id: '1',
                book: '1',
                series: '1',
            },
            {
                id: '2',
                book: '2',
                series: '2',
            },
        ],
    }; */
} else {
    state = JSON.parse(state);
}

const updateStorage = state => {
    localStorage.setItem('vue-books', JSON.stringify(state));
};

const createAuthor = data => {
    let author = {
        id: uuid.v4(),
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
    return {
        id: uuid.v4(),
        title: data.series,
    };
};

export default {
    getState (callback) {
        const response = {
            data: state,
            status: 1,
        };

        callback(response);
    },
    addBook (data, callback) {
        let id = data.id ? data.id : uuid.v4();
        let book = {
            ...data,
            id,
        };
        state.booksById[book.id] = book;

        if (data.id === undefined) {
            state.books.push(book.id);
        }

        if (data.series) {
            let series;
            series = this.getSeries(data);
            if (!series) {
                series = createSeries(data);
                state.series.push(series);
            }
            state.booksSeries.push({
                id: uuid.v4(),
                book: book.id,
                series: series.id,
            });
        }

        if (data.firstName || data.lastName) {
            let authorId = this.getAuthor(data);
            if (!authorId) {
                const author = createAuthor(data);
                authorId = author.id;
                state.authors.push(author);
            }
            state.booksAuthors.push({
                id: uuid.v4(),
                book: book.id,
                author: authorId,
            });
        }

        updateStorage(state);

        const response = {
            book,
            status: 1,
        };

        callback(response);
    },
    removeBook (id, callback) {
        state.books.splice(state.books.indexOf(id), 1);
        delete state.booksById[id];
        state.booksAuthors = state.booksAuthors.filter(bookAuthor => {
            return bookAuthor.book !== id;
        });
        updateStorage(state);

        const response = {
            status: 1,
        };

        callback(response);
    },
    getAuthor (data) {
        let authorId;
        state.authors.forEach(author => {
            if (author.firstName.toLowerCase() === data.firstName.toLowerCase() &&
                author.lastName.toLowerCase() === data.lastName.toLowerCase()) {
                authorId = author.id;
            }
        });
        return authorId;
    },
    getSeries (data) {
        let bookSeries;
        state.series.forEach(series => {
            if (series.title.toLowerCase() === data.series.toLowerCase()) {
                bookSeries = series;
            }
        });
        return bookSeries;
    },
};
