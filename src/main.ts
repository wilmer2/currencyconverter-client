import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import withUUID from 'vue-uuid';
import App from './App.vue';
import { router } from './router';
import './index.css';
import clickOutside from './directives/clickOutside';
// import { useUserStore } from '@/stores/useUserStore';

const app = withUUID(createApp(App));
app.directive('click-outside', clickOutside);

app.use(createPinia());
app.use(router);
app.mount('#app');
