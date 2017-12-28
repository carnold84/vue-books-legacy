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
    addBook (data) {
        if (this.debug) {
            console.log('addBook triggered with', data);
        }
        let state = this.state;

        let series;
        if (data.series) {
            series = this.getSeries(data);
            if (!series) {
                series = createSeries(data);
                state.series.push(series);
            }
        }

        let book = {
            id: uuid.v4(),
            title: data.title,
            series: series ? series.id : undefined,
            bookNumber: data.bookNumber,
        };
        state.booksById[book.id] = book;
        state.books.push(book.id);

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

        this.updateStorage(state);
    },
    removeBook (book) {
        if (this.debug) {
            console.log('removeBook triggered with', book);
        }
        let state = this.state;
        state.books.splice(state.books.indexOf(book.id), 1);
        delete state.booksById[book.id];
        state.booksAuthors = state.booksAuthors.filter(bookAuthor => {
            return bookAuthor.book !== book.id;
        });
        this.updateStorage(state);
    },
    updateStorage (state) {
        if (this.debug) {
            console.log('updateStorage triggered with', state);
        }
        localStorage.setItem('vue-books', JSON.stringify(state));
        this.state = state;
    },
    getAuthor (data) {
        let authorId;
        this.state.authors.forEach(author => {
            if (author.firstName.toLowerCase() === data.firstName.toLowerCase() &&
                author.lastName.toLowerCase() === data.lastName.toLowerCase()) {
                authorId = author.id;
            }
        });
        return authorId;
    },
    getSeries (data) {
        let seriesId;
        this.state.series.forEach(series => {
            if (series.title.toLowerCase() === data.title.toLowerCase()) {
                seriesId = series.id;
            }
        });
        return seriesId;
    },
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

export default store;
