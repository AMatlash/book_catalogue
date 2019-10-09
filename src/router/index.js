import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        /* {
            path: '/',
            name: 'home',
            component: Home
        }, */
        {
            path: '/ui-kit-pre',
            name: 'ui-kit-pre',
            component: () => import(/* webpackPrefetch: true */ '@views/UI-kit-pre.vue')
        }
    ]
});
