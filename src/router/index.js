import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import EditBook from '@/pages/EditBook';
import EditAuthor from '@/pages/EditAuthor';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: window.location.pathname,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/author/:name',
            name: 'Authors',
            component: Home,
        },
        {
            path: '/series/:title',
            name: 'Series',
            component: Home,
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
    ],
});
