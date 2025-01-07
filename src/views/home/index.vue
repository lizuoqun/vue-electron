<template>
  <div class="flex h-full flex-col bg-white p-2.5">
    <el-row class="mt-2.5 select-text">
      <el-form :inline="true" :model="searchForm" label-width="100px" class="search-form">
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchForm.sex" placeholder="" clearable>
            <el-option v-for="o of sexEnum" :key="o.id" :label="o.name" :value="o.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchForm.sex" placeholder="" clearable>
            <el-option v-for="o of sexEnum" :key="o.id" :label="o.name" :value="o.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchForm.sex" placeholder="" clearable>
            <el-option v-for="o of sexEnum" :key="o.id" :label="o.name" :value="o.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="searchForm.time" type="datetimerange" range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间" clearable/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="mx-2.5">
      <el-button type="primary" @click="doSearch">查询</el-button>
      <el-button type="primary">新增</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="primary">删除</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </el-row>
    <el-row class="m-2.5 flex-1" style="height: 100%">
      <el-table class="flex-1" :data="tableData" height="100%" v-loading="tableLoading"
                style="position: absolute; width: 100%" show-overflow-tooltip>
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column label="序号" type="index" align="center" width="55"></el-table-column>
        <el-table-column prop="name" label="名称" width="150"></el-table-column>
        <el-table-column prop="count" label="数量" width="120"/>
        <el-table-column prop="flag" label="标记" width="100"/>
        <el-table-column prop="status" label="状态" width="100"/>
        <el-table-column prop="count" label="数量" width="120"/>
        <el-table-column prop="flag" label="标记" width="100"/>
        <el-table-column prop="status" label="状态" width="100"/>
        <el-table-column prop="count" label="数量" width="120"/>
        <el-table-column prop="flag" label="标记" width="100"/>
        <el-table-column prop="status" label="状态" width="100"/>
        <el-table-column prop="remark" label="备注" :min-width="120"/>
      </el-table>
    </el-row>
    <el-row class="my-2.5 justify-end">
      <el-pagination v-model:current-page="searchForm.page" v-model:page-size="searchForm.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :page-sizes="[30, 50, 100]"
                     :total="searchForm.total" background
                     @size-change="handleSizeChange" @current-change="handlePageNoChange"/>
    </el-row>
  </div>
</template>


<script setup lang="ts">

const sexEnum = [{id: 1, name: '男'}, {id: 2, name: '女'}];
const tableLoading = ref(false);

interface tableInterface {
  name: string,
  count: number,
  flag: string,
  status: string,
  remark: string
}

const tableData = reactive<tableInterface[]>([]);
const searchForm = reactive({
  name: '',
  sex: '',
  time: '',
  page: 1,
  pageSize: 30,
  total: 100
});

function doSearch() {
  tableLoading.value = true;
  for (let i = 0; i < 100; i++) {
    tableData.push({
      name: '名称' + i,
      count: i,
      flag: i / 2 === 0 ? '是' : '否',
      status: i / 2 != 0 ? '正常' : '异常',
      remark: new Date() + ''
    });
  }
  setTimeout(() => {
    tableLoading.value = false;
  }, 2000);
}

onMounted(() => {
  doSearch();
});

function handleSizeChange() {

}

function handlePageNoChange() {

}
</script>
