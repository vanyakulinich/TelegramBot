import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const createRouter = () => {

  return new Router({
    mode: 'history',
    routes: [
      { path: `/app/:token/personal_info`, component: () => import('../pages/PersonalInfo.vue') },
      { path: `/app/:token/reminder_manager`, component: () => import('../pages/ReminderManager.vue') },

    ]
  })
} 