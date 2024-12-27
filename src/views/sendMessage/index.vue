<script setup lang="ts">
onMounted(() => {
  const information = document.getElementById('info') as HTMLDivElement;
  information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;
});

const renderToMainSingleProcess = () => {
  electronApi.setTitle('渲染进程');
};

let filePath = ref<string>('');
const renderToMainMultiProcess = async () => {
  filePath.value = await window.electronApi.openFile();
};

let counter = ref(0);
const mainToRender = () => {
  window.electronApi.onUpdateCounter((value: number) => {
    const oldValue = Number(counter.value);
    const newValue = oldValue + value;
    counter.value = newValue;
    window.electronApi.counterValue(newValue);
  });
};
</script>

<template>
  <div id="info"></div>
  <div>versions: {{ versions }}</div>
  <div>渲染进程->主进程通信</div>
  <el-button type="primary" @click="renderToMainSingleProcess">单向</el-button>
  <el-button type="primary" @click="renderToMainMultiProcess">双向</el-button>
  <div>双向通信的文件路径为:{{ filePath }}</div>
  <el-button type="primary" @click="mainToRender">主进程->渲染进程通信</el-button>
  <div>Current value = {{ counter }}</div>
</template>
