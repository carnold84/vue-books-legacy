import api from '../api/local-storage';

const store = {
    debug: true,
    state: {
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
    },
    init () {
        if (this.debug) {
            console.info('init triggered');
        }

        api.getAllData(response => {
            this.state = response.data;
        });
    },
    addBook (data) {
        if (this.debug) {
            console.info('addBook triggered with', data);
        }

        api.addBook(data, response => {
            this.state = response.data;
        });
    },
    removeBook (id) {
        if (this.debug) {
            console.info('removeBook triggered with', id);
        }

        api.removeBook(id, response => {
            this.state = response.data;
        });
    },
    addAuthor (data) {
        if (this.debug) {
            console.info('addAuthor triggered with', data);
        }

        api.addAuthor(data, response => {
            this.state = response.data;
        });
    },
    updateState (state) {
        if (this.debug) {
            console.info('updateState triggered with', state);
        }
        this.state = state;
    },
};

export default store;
