import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('RendererEvents', {
  onLogin: (callback: (uid?: string) => void) => {
    ipcRenderer.on('RendererEvents.onLogin', (_, uid: string) => callback(uid));
  },
  onSettingsWindowCreated: (callback: () => void) => {
    ipcRenderer.on('RendererEvents.onSettingsWindowCreated', callback);
  },
  onSettingsWindowCreatedOnce: (callback: () => void) => {
    ipcRenderer.once('RendererEvents.onSettingsWindowCreated', callback);
  },
  onMessageWindowCreated: (callback: () => void) => {
    ipcRenderer.on('RendererEvents.onMessageWindowCreated', callback);
  },
  onMessageWindowCreatedOnce: (callback: () => void) => {
    ipcRenderer.once('RendererEvents.onMessageWindowCreated', callback);
  },
});

const readConfig = <T>(id: string, defaultConfig?: T): T => {
  return ipcRenderer.sendSync('Hako.readConfig', id, defaultConfig);
};

const writeConfig = <T>(id: string, newConfig: T): boolean => {
  return ipcRenderer.sendSync('Hako.writeConfig', id, newConfig);
};

const openPath = (path: string) => {
  ipcRenderer.send('Hako.openPath', path);
};

const openExternal = (url: string) => {
  ipcRenderer.send('Hako.openExternal', url);
};

contextBridge.exposeInMainWorld('Hako', {
  readConfig,
  writeConfig,
  openPath,
  openExternal,
  parsePath: (...pathParts: string[]): Promise<string> => {
    return ipcRenderer.invoke('Hako.parsePath', ...pathParts);
  },
});

Object.defineProperty(globalThis, 'PluginSettings', {
  value: {
    preload: {
      readConfig,
      writeConfig,
      openPath,
      openExternal,
    },
  },
  writable: true,
});