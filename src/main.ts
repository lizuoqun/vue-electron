import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import App from './App.vue';
import './style.css';
import router from './router/index';

createApp(App)
  .use(ElementPlus, {locale: zhCn, size: 'default', zIndex: 3000})
  .use(router)
  .mount('#app');
