/// <reference types="vite/client" />

// TODO VUE文件在工程中无法识别，需要在此处声明，如果后续版本的Vue中解决了这个问题，可以删除这段声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
