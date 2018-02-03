import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Authors from '@/pages/Authors';
import EditBook from '@/pages/EditBook';
import EditAuthor from '@/pages/EditAuthor';
import EditSeries from '@/pages/EditSeries';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: '/demo/',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/author/:name',
            name: 'AuthorBooks',
            component: Home,
        },
        {
            path: '/series/:title',
            name: 'SeriesBooks',
            component: Home,
        },
        {
            path: '/authors',
            name: 'Authors',
            component: Authors,
        },
        {
            path: '/add-book',
            name: 'AddBook',
            component: EditBook,
        },
        {
            path: '/edit-book/:id',
            name: 'EditBook',
            component: EditBook,
        },
        {
            path: '/add-author',
            name: 'AddAuthor',
            component: EditAuthor,
        },
        {
            path: '/add-series',
            name: 'AddSeries',
            component: EditSeries,
        },
    ],
});
