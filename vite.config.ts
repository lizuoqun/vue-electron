import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [vue(),
    // 自动引入
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts'
    })],
  base: './',
  build: {
    outDir: 'dist-vue',
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    }
  },
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
