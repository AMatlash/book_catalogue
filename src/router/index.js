import Vue from 'vue';
import Router from 'vue-router';
import Home from '@views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // component: () => import(/* webpackChunkName: "about" */ '@views/About.vue')
            component: () => import(/* webpackPrefetch: true */ '@views/About.vue')
        },
        {
            path: '/ui-kit-pre',
            name: 'ui-kit-pre',
            component: () => import(/* webpackPrefetch: true */ '@views/UI-kit-pre.vue')
        }
    ]
});
