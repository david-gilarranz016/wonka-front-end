// import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './components/Router.js';
import './index.css';

createApp(App)
  .use(router)
  .mount('#app');
