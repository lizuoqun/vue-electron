import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/', redirect: '/home'
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('@/views/menu/index.vue'),
    meta: {title: '首页'}
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }];


const router = createRouter({
  history: createWebHistory(), routes
});

export function getRouter() {
  return routes;
}

export default router;