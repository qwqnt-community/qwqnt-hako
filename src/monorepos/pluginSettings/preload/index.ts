import { contextBridge, ipcRenderer } from 'electron';

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