const {BrowserWindow} = require('electron');

/**
 * 创建窗口对象*/
class Window {
  win = null;

  createWindow() {
    this.win = new BrowserWindow({
      width: 800,
      height: 600
    });
    let contents = this.win.webContents;
    contents.openDevTools();
    this.win.loadURL('http://localhost:5173/');
    return this.win;
  }
}

module.exports = Window;