<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import {onMounted} from 'vue';

onMounted(() => {
  const information = document.getElementById('info') as HTMLDivElement;
  information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;
});
</script>

<template>
  <HelloWorld msg="Vite + Vue"/>
  <div id="info"></div>
  <div>versions: {{ versions }}</div>
</template>

<style scoped>

</style>
