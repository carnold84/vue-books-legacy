import uuid from 'uuid';

const store = {
    debug: true,
    state: {
        books: [],
        booksById: {},
        authors: [],
        booksAuthors: [],
        series: [],
        booksSeries: [],
    },
    init () {
        if (this.debug) {
            console.log('init triggered');
        }
        // localStorage.removeItem('vue-books');
        let state = localStorage.getItem('vue-books');

        if (state === null) {
            state = {
                books: ['1', '2'],
                booksById: {
                    '1': {
                        id: '1',
                        title: 'The Spy Who Read Me',
                        series: '1',
                        bookNumber: '1',
                    },
                    '2': {
                        id: '2',
                        title: 'Harry Booker and the Editor\'s Stone',
                        series: '2',
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
            };
        } else {
            state = JSON.parse(state);
        }

        this.updateStorage(state);
    },
    addBook (book) {
        if (this.debug) {
            console.log('addBook triggered with', book);
        }
        let state = this.state;
        book.id = uuid.v4();
        book.author = createAuthor(book);
        book.series = createSeries(book);
        state.books.push(book);
        this.updateStorage(state);
    },
    removeBook (book) {
        if (this.debug) {
            console.log('removeBook triggered with', book);
        }
        let state = this.state;
        state.books.splice(state.books.indexOf(book), 1);
        this.updateStorage(state);
    },
    updateStorage (state) {
        if (this.debug) {
            console.log('updateStorage triggered with', state);
        }
        // localStorage.setItem('vue-books', JSON.stringify(state));
        this.state = state;
    },
};

const createAuthor = book => {
    let author = {};
    if (book.firstName) {
        author.firstName = book.firstName;
        delete book.firstName;
    }
    if (book.lastName) {
        author.lastName = book.lastName;
        delete book.lastName;
    }
    return author;
};

const createSeries = book => {
    let series = {};
    if (book.series) {
        series.series = book.series;
        delete book.series;
    }
    if (book.bookNumber) {
        series.bookNumber = book.bookNumber;
        delete book.bookNumber;
    }
    return series;
};

export default store;
