<!-- 组件 -->
<script setup lang="ts">
import {getRouter} from '@/router';

const allRouter = getRouter();
</script>

<template>
  <div>
    <el-space class="w-full" size="100" wrap>
      <el-card v-for="item in allRouter" :key="item.path" class="box-card" shadow="hover"
               style="width: calc((100vw - 50px) / 4);height: 300px">
        <template #header>
          <div class="card-header">
            <div class="text-lg font-bold">{{ item.name }}</div>
          </div>
        </template>
        <div class="text-sm mb-2.5">
          访问地址：
          <el-link :href="item.path" target="_blank" type="primary"> {{ item.path }}</el-link>
        </div>
      </el-card>
    </el-space>
  </div>
</template>