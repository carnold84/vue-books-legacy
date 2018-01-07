import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import EditBook from '@/pages/EditBook';

Vue.use(Router);

const isDemo = true;

export default new Router({
    mode: isDemo ? 'hash' : 'history',
    base: '/demo/',
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
    ],
});
