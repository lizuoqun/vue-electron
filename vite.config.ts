import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      //别名配置
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src')
    },
    //共享配置 https://cn.vitejs.dev/config/shared-options.html#resolve-extensions
    extensions: [
      '.mjs',
      '.js',
      '.mts',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue'
    ]
  }
});
