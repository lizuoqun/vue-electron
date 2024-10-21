const {contextBridge, ipcRenderer} = require('electron');
/**
 * 在预处理的过程当中，不能直接将值给绑定到window对象上再取值，
 * 虽然预加载脚本与其所附着的渲染器在共享着一个全局 window 对象，
 * 但并不能从中直接附加任何变动到 window 之上，因为 contextIsolation 是默认的。
 * 所以在preload当中window.myAPI = { desktop: true } 设置了myAPI，但是在render当中获取不到console.log(window.myAPI)
 */
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld('electronApi', {
  // 渲染器进程到主进程的通信（单向通信）
  setTitle: (title) => ipcRenderer.send('set-title', title),
  // 渲染器进程到主进程的通信（双向通信）
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // 主进程向渲染器进程发送消息
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value)
});