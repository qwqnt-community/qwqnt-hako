import '../components/index';
import settingsStyle from '../settings/static/style.css?raw';
import packageJson from '../../package.json' with { type: 'json' };
import { SettingInterface } from '../settings/index';
import type { IQwQNTPlugin } from '../types/QwQNTPlugin';

const settingInterface = new Promise<SettingInterface>(resolve => {
  RendererEvents.onSettingsWindowCreated(() => {
    document.head.insertAdjacentHTML('beforeend', `<style>${settingsStyle}</style>`);
    resolve(new SettingInterface());
  });
});

const registerPluginSettings = async (packageJson: IQwQNTPlugin): Promise<HTMLDivElement> => {
  return await (await settingInterface).add(packageJson);
};

Object.defineProperty(window, 'PluginSettings', {
  value: {
    renderer: {
      registerPluginSettings,
      readConfig: Hako.readConfig,
      writeConfig: Hako.writeConfig,
      openPath: Hako.openPath,
      openExternal: Hako.openExternal,
    },
  },
  writable: true,
});

RendererEvents.onSettingsWindowCreated(async () => {
  const view = await registerPluginSettings(packageJson);
  const pluginPath = __self.meta.path;
  const settingsPageStoragePath = qwqnt.framework.protocol.pathToStorageUrl(`${pluginPath}\\pages\\settings.html`);

  view.innerHTML = await (await fetch(settingsPageStoragePath)).text();

  const versions = await Hako.getVersions();

  view.querySelector('.versions .electron .version')!.textContent = versions.electron;
  view.querySelector('.versions .chromium .version')!.textContent = versions.chromium;
  view.querySelector('.versions .nodejs .version')!.textContent = versions.nodejs;
});