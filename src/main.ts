import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import withUUID from 'vue-uuid';
import App from './App.vue';
import router from './router';
import './index.css';

const app = withUUID(createApp(App));

app.use(createPinia());
app.use(router);

app.mount('#app');
