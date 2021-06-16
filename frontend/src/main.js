import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import cookies from 'vue3-cookies';
import './index.css';

createApp(App).use(cookies).use(store).use(router).mount('#app');
