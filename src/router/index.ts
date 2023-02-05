import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/MainPage.vue'),
  } as RouteRecordRaw,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  } as RouteRecordRaw,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
