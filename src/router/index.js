import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/catalogue'
        },
        {
            path: '/ui-kit-pre',
            name: 'ui-kit-pre',
            component: () => import(/* webpackPrefetch: true */ '@views/UI-kit-pre.vue')
        },
        {
            path: '/catalogue',
            name: 'catalogue',
            component: () => import(/* webpackPrefetch: true */ '@views/Catalogue.vue')
        },
        {
            path: '/book/:book_id',
            name: 'book-edit-screen',
            component: () => import(/* webpackPrefetch: true */ '@views/Book_edit_screen.vue')
        }
    ]
});
