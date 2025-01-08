<template>
  <el-container class="h-full w-full">
    <el-aside width="200px">
      <el-menu
          default-active="1-1"
          class="h-full"
          @select="onMenuSelect"
      >
        <el-sub-menu v-for="(item) in allMenuList" :key="item.id" :index="item.id">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.id">{{ child.name }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main>
      <RouterView v-slot="{ Component }">
        <Transition name="slide-zoom">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </Transition>
      </RouterView>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {Location} from '@element-plus/icons-vue';
import router from '@/router';

const allMenuList = [
  {
    id: '1', name: '卡皮巴拉', icon: 'iconfont icon-menu', children: [
      {id: '1-1', name: '玛卡巴卡', url: '/home'}
    ]
  },
  {
    id: '2', name: '菜单1', icon: 'iconfont icon-menu', children: [
      {id: '2-1', name: '子菜单', url: '/menu1'}
    ]
  }
];

const onMenuSelect = async (index: string) => {
  const [start, end] = index.split('-') as [string, string];
  const url = allMenuList[Number(start) - 1].children[Number(end) - 1].url;
  await router.push(url);
};
</script>