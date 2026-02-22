import { join, normalize } from 'node:path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { ipcMain, shell, type IpcMainEvent } from 'electron';

const writeConfig = <T>(id: string, newConfig: T): boolean => {
  try{
    const configsPath: string = qwqnt.framework.paths.configs;
    const configPath = join(configsPath, id, 'config.json');
    const rawNewConfig = JSON.stringify(newConfig, undefined, 2);

    writeFileSync(configPath, rawNewConfig, 'utf-8');

    return true;
  } catch{
    return false;
  }
};
const readConfig = <T>(id: string, defaultConfig?: T): T => {
  const configsPath: string = qwqnt.framework.paths.configs;
  const idPath = join(configsPath, id);
  const configPath = join(idPath, 'config.json');

  if(!existsSync(idPath)) mkdirSync(idPath);
  if(!existsSync(configPath)) writeConfig(id, defaultConfig ? defaultConfig : {});

  return JSON.parse(readFileSync(configPath, 'utf-8'));
};

const openPath = (path: string) => {
  shell.openPath(path);
};

const openExternal = (url: string) => {
  shell.openExternal(url);
};

ipcMain.handle('Hako.parsePath', (_, ...pathParts: string[]) => {
  return normalize(join(...pathParts));
});

ipcMain.on('Hako.readConfig', <T>(event: IpcMainEvent, id: string, defaultConfig?: T) => {
  event.returnValue = readConfig(id, defaultConfig);
});

ipcMain.on('Hako.writeConfig', <T>(event: IpcMainEvent, id: string, newConfig: T) => {
  event.returnValue = writeConfig(id, newConfig);
});

ipcMain.on('Hako.openPath', (_, path: string) => openPath(path));

ipcMain.on('Hako.openExternal', (_, url: string) => openExternal(url));

Object.defineProperty(globalThis, 'PluginSettings', {
  value: {
    main: {
      readConfig,
      writeConfig,
      openPath,
      openExternal,
    },
  },
  writable: true,
});