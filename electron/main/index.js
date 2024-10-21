// electron入口
// console.log('hello electron');


const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('node:path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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
      label: app.name,
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
  win.loadURL('http://localhost:5173/');
  // win.maximize()
};


async function handleFileOpen() {
  const {canceled, filePaths} = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

app.whenReady().then(() => {
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