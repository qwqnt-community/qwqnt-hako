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