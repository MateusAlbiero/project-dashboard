import { RouteRecordRaw } from 'vue-router';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('expiration');
  
  return token && expiration && Date.now() < parseInt(expiration);
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('src/pages/auth/LoginPage.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next('/home');
      } else {
        next();
      }
    },
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/TaskDashboard.vue') }],
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;