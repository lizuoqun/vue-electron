/**
 * server.js
 * 把这个文件挪动到dist-vue（打包的vue3项目的输出目录下，index.html同级）
 * 通过express启动打包后的vue3项目
 * @author: modify
 * */
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 定义路由以访问 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
