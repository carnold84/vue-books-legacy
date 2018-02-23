import _merge from 'lodash/merge';

import api from '../api/local-storage';

const store = {
    debug: true,
    state: {
        config: undefined,
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

        fetch('./static/config/config.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.state.config = data;
                api.init(this.state.config.dbName, response => {
                    this.state = _merge(this.state, response.data);
                });
            });
    },
    getAllData () {
        api.getAllData(response => {
            this.state = _merge(this.state, response.data);
        });
    },
    addBook (data) {
        if (this.debug) {
            console.info('addBook triggered with', data);
        }

        api.addBook(data, response => {
            this.state = _merge(this.state, response.data);
        });
    },
    removeBook (id) {
        if (this.debug) {
            console.info('removeBook triggered with', id);
        }

        api.removeBook(id, response => {
            this.state = _merge(this.state, response.data);
        });
    },
    addAuthor (data) {
        if (this.debug) {
            console.info('addAuthor triggered with', data);
        }

        api.addAuthor(data, response => {
            this.state = _merge(this.state, response.data);
        });
    },
    removeAuthor (id) {
        if (this.debug) {
            console.info('removeAuthor triggered with', id);
        }

        api.removeAuthor(id, response => {
            this.state = _merge(this.state, response.data);
        });
    },
    addSeries (data) {
        if (this.debug) {
            console.info('addSeries triggered with', data);
        }

        api.addSeries(data, response => {
            this.state = _merge(this.state, response.data);
        });
    },
    removeSeries (id) {
        if (this.debug) {
            console.info('removeSeries triggered with', id);
        }

        api.removeSeries(id, response => {
            this.state = _merge(this.state, response.data);
        });
    },
};

export default store;
