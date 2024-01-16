import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { title: 'Index' },
      },
    ],
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.connectedUser && to.name !== 'login') {
        return next({ name: 'login' });
      }
      return next();
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/AuthPage.vue'),
  },
  {
    name: 'synchronization',
    path: '/init-synchronization',
    component: () => import('pages/InitSynchronization.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.connectedUser && to.name !== 'login') {
        return next({ name: 'login' });
      }
      return next();
    },
  },
];

export default routes;
