import { createRouter, createWebHistory } from 'vue-router';
import TheLogin from './Features/Login/TheLogin.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: TheLogin },
    { path: '/signUp', component: null },
  ],
});

export default router;
