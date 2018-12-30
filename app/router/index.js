import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const createRouter = () => {

  return new Router({
    mode: 'history',
    routes: [
      // TODO: implement routes for app
      { path: '/vue-app', component: () => import('./components/Home.vue') }
    ]
  })
} 