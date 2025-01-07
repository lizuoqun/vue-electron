/**
 * server.js
 * 把这个文件挪动到dist-vue（打包的vue3项目的输出目录下，index.html同级）
 * 通过express启动打包后的vue3项目
 * @author: modify
 * */
const express = require('express');
const { execSync } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

// 检查端口是否被占用、如果被占用就杀掉
function killPortProcess(port) {
  try {
    // 检查哪个进程占用了指定端口
    const output = execSync(`netstat -ano | findstr :${port}`).toString();
    const match = output.match(/(\d+)/); // 匹配进程ID
    if (match && match[1]) {
      const pid = match[1];
      console.log(`Port ${port} is in use by PID ${pid}`);
      // 杀掉占用端口的进程
      execSync(`taskkill /F /PID ${pid}`);
      console.log(`Killed process with PID ${pid} that was using port ${port}`);
    } else {
      console.log(`Port ${port} is not in use`);
    }
  } catch (error) {
    console.error(`Error checking port ${port}:`, error);
  }
}

// 替换为你希望检查的端口号
killPortProcess(port);



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
