import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
  {
    path: '/', name: 'INDEX', component: () => import('@/views/menu'), meta: {title: '首页'}
  },
  {
    path: '/home', name: 'HOME', component: () => import('@/views/home'), chinaName: 'Home'
  }];
const router = createRouter({
  history: createWebHashHistory(), routes
});

export function getRouter() {
  return routes;
}

export default router;