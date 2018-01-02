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

        let book = {
            id: data.id ? data.id : uuid.v4(),
            title: data.title,
            bookNumber: data.bookNumber,
        };
        state.booksById[book.id] = book;

        if (data.id) {
            let index = state.books.indexOf(book.id);
            if (index) {
                state.books.splice(index, 1, [book.id]);
            } else {
                console.error('Could not update ', book.title);
            }
        } else {
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
        let bookSeries;
        this.state.series.forEach(series => {
            if (series.title.toLowerCase() === data.series.toLowerCase()) {
                bookSeries = series;
            }
        });
        return bookSeries;
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
