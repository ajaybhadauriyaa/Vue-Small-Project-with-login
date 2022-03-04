import { createRouter, createWebHistory } from 'vue-router';
import TheLogin from './Features/Login/TheLogin.vue';
import TheUsersList from './Features/UsersList/TheUsersList.vue';
import Register from './Features/Register/Register.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: TheLogin },
    { path: '/signUp', component: Register },

    { path: '/usersList', component: TheUsersList },
  ],
});

export default router;
