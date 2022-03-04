import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import BaseCard from './UI/BaseCard.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.component('base-card', BaseCard);

app.mount('#app');
