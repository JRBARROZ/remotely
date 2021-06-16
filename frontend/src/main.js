import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import cookies from 'vue3-cookies';
import './index.css';
const axios = require('axios').default;

const token = localStorage.getItem('user-token');

if (token) axios.defaults.headers.common['Authorization'] = token;

createApp(App).use(cookies).use(store).use(router).mount('#app');
