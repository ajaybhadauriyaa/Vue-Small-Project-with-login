import { createRouter, createWebHistory } from 'vue-router';
import TheLogin from './Features/Login/TheLogin.vue';
import TheHome from './Features/Home/TheHome.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: TheLogin },
    { path: '/signUp', component: null },
    { path: '/home', component: TheHome },
  ],
});

export default router;
