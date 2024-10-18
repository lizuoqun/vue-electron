<script setup lang="ts">
import {onMounted} from 'vue';

onMounted(() => {
  const information = document.getElementById('info') as HTMLDivElement;
  information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;
});

const renderToMainProcess = () => {
  electronApi.setTitle('渲染进程');
};
</script>

<template>
  <div id="info"></div>
  <div>versions: {{ versions }}</div>
  <el-button type="primary" @click="renderToMainProcess">渲染进程->主进程</el-button>
</template>

<style scoped>

</style>
