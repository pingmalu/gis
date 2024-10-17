// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Keymove from './components/keymove.vue';
import Keymove2 from './components/keymove2.vue';
import Buildings from './components/Buildings.vue';
import Fly from './components/fly.vue';
import Fly2 from './components/fly2.vue';

const routes = [
  {
    path: '/',
    component: Keymove, // 默认路由
  },
  {
    path: '/k2',
    component: Keymove2, // 默认路由
  },
  {
    path: '/build',
    component: Buildings, // 指定的路由
  },
  {
    path: '/fly',
    component: Fly, // 指定的路由
  },
  {
    path: '/fly2',
    component: Fly2, // 指定的路由
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
