// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Keymove from './components/keymove.vue';
import Buildings from './components/Buildings.vue';

const routes = [
  {
    path: '/',
    component: Keymove, // 默认路由
  },
  {
    path: '/build',
    component: Buildings, // 指定的路由
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
