import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: () => import('@/views/menu/index.vue'),
    meta: {title: '首页'},
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/sendMessage',
        name: 'sendMessage',
        component: () => import('@/views/sendMessage/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(), routes
});

export default router;