import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import BaseDialog from './UI/BaseDialog.vue';

const app = createApp(App);

app.use(router);
app.component('base-dialog', BaseDialog);

app.mount('#app');
