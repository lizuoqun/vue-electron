// electron入口
// console.log('hello electron');


const {app, BrowserWindow, ipcMain} = require('electron');
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

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender;
    const ipcWin = BrowserWindow.fromWebContents(webContents);
    ipcWin.setTitle(title);
  });
  // win = getWindowState();
  win.loadURL('http://localhost:5173/');
};


app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});