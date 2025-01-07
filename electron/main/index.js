// electron入口
// console.log('hello electron');


const {app, BrowserWindow, ipcMain, dialog, Menu, Tray} = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('node:path');
// 用这个调用别的js
const {exec} = require('child_process');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 渲染进程->主进程通信（单向）
  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const ipcWin = BrowserWindow.fromWebContents(webContents);
    ipcWin.setTitle(title);
    // 要拿到的是渲染进程的窗口，而不是主进程的窗口（虽然两个目前来看是同一个）
    // win.setTitle(title);
  });
  // win = getWindowState();

  const menu = Menu.buildFromTemplate([
    {
      label: '运算',
      submenu: [
        {
          click: () => win.webContents.send('update-counter', 1),
          label: '加一'
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: '减一'
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
  // win.webContents.openDevTools();

  // 托盘图标
  const tray = new Tray(path.resolve(__dirname, '../logo.ico'));

  const trayMenu = Menu.buildFromTemplate([
    {label: '子菜单1'},
    {label: '退出', role: 'quit'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);

  tray.setContextMenu(trayMenu);
  tray.setToolTip('This is my application');
  tray.setTitle('This is my title');

  // win.loadURL('http://localhost:5173/menu');

  win.loadURL('http://localhost:3000');

  // const targetUrl = path.resolve(__dirname, '../../dist-vue/index.html');
  // win.loadURL(`file://${targetUrl}`);
  // win.loadFile(path.resolve(__dirname, '../../dist-vue/index.html'));
  // win.maximize()
};


async function handleFileOpen() {
  const {canceled, filePaths} = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

app.whenReady().then(() => {

  // 执行cmd命令，执行node脚本启动3000端口
  exec('node ./dist-vue/server.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`启动3000失败: ${stderr}`);
      return;
    }
    console.log('exec--------', stdout);
  });

  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value);
  });
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});