import api from '../api/local-storage';

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

        api.getState(response => {
            this.updateState(response.data);
        });
    },
    addBook (data) {
        if (this.debug) {
            console.log('addBook triggered with', data);
        }

        api.addBook(data, () => {
            api.getState(response => {
                this.updateState(response.data);
            });
        });
    },
    removeBook (id) {
        if (this.debug) {
            console.log('removeBook triggered with', id);
        }

        api.removeBook(id, () => {
            api.getState(response => {
                this.updateState(response.data);
            });
        });
    },
    updateState (state) {
        if (this.debug) {
            console.log('updateState triggered with', state);
        }
        this.state = state;
    },
};

export default store;
