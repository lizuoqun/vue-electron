import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import './style.css';
import App from './App.vue';
import router from './router/index';

createApp(App)
  .use(ElementPlus)
  .use(ElementPlus, {locale: zhCn, size: 'small', zIndex: 3000})
  .use(router)
  .mount('#app');
