# qwqnt-hako

本插件用于替代原 qwqnt-renderer-events 和 qwqnt-plugin-settings 插件。

上述两个插件自本插件发布起停止维护和使用。

出于向后兼容的需要，本插件对于上述两个插件的全局变量并未做更改。

本插件使用 `qwqnt-ipc-interceptor` 插件作为前置。

## 使用

### 事件

在 Renderer 中，使用 `RendererEvents.onSettingsWindowCreated` 对设置窗口的创建进行监听。

对于一次性的监听，请使用 `RendererEvents.onSettingsWindowCreatedOnce` 。

下面是一个实例：

```typescript
// renderer
RendererEvents.onSettingsWindowCreated(() => {
  alert('settings');
});
```

在 Renderer 中，使用 `RendererEvents.onMessageWindowCreated` 对主窗口的创建进行监听。

对于一次性的监听，请使用 `RendererEvents.onMessageWindowCreatedOnce` 。

下面是一个实例：

```typescript
// renderer
RendererEvents.onMessageWindowCreated(() => {
  alert('message');
});
```

在 Renderer 中，使用 `RendererEvents.onLogin` 对用户登录进行监听。

下面是一个实例：

```typescript
// renderer
RendererEvents.onLogin((uid: string) => {
  alert(uid);
});
```

### 设置及配置

在 Renderer 中，使用 `PluginSettings.renderer.registerPluginSettings` 注册设置窗口。

`PluginSettings.renderer.registerPluginSettings` 接受一个参数，`packageJson` 。

- `packageJson`: 插件的 `package.json` 。

下面是一个实例：

```typescript
// renderer
// 方法一：
RendererEvents.onSettingsWindowCreated(async () => {
  const view = await PluginSettings.renderer.registerPluginSettings(packageJson);
});

// 方法二：
PluginSettings.renderer.registerPluginSettings(packageJson).then(view => {
  // your codes
});
```

你可以分别在 renderer 和 main 中读写配置。

对于 renderer ，你可以使用 `PluginSettings.renderer` 下的方法。

对于 preload ，你可以使用 `PluginSettings.preload` 下的方法。

对于 main ，你可以使用 `PluginSettings.main` 下的方法。

具体方法见下方定义。

读配置，使用 `readConfig` 方法，传入 `id` 和 `defaultConfig`（可选） 参数。

`defaultConfig` 参数将在配置文件不存在，自动创建配置文件时，默认写入文件。

写配置，使用 `writeConfig` 方法，传入 `id` 和 `newConfig` 参数。

对于 Typescript ，`readConfig` 的返回值和 `writeConfig` 的 `newConfig` 参数均为泛型。

## Typescript 支持

如果你使用 Typescript，你可能需要在你的 global.d.ts 文件中添加：

```Typescript
// global.d.ts
declare namespace RendererEvents {
  const onLogin: (callback: (uid?: string) => void) => void;
  const onSettingsWindowCreated: (callback: () => void) => void;
  const onSettingsWindowCreatedOnce: (callback: () => void) => void;
  const onMessageWindowCreated: (callback: () => void) => void;
  const onMessageWindowCreatedOnce: (callback: () => void) => void;
}

interface IQwQNTPlugin {
  name: string;
  qwqnt?: {
    name?: string;
    icon?: string;
    inject?: {
      main?: string;
      renderer?: string;
      preload?: string;
    };
  };
};

declare namespace PluginSettings {
  interface ICommon {
    readConfig: <T>(id: string, defaultConfig?: T) => T;
    writeConfig: <T>(id: string, newConfig: T) => boolean;
    openPath: (path: string) => void;
    openExternal: (url: string) => void;
  }
  interface IRenderer extends ICommon {
    registerPluginSettings: (packageJson: IQwQNTPlugin) => Promise<HTMLDivElement>;
  }

  const main: ICommon;
  const preload: ICommon;
  const renderer: IRenderer;
}
```

## License
```
    MIT License

    qwqnt-hako
    Copyright (C) 2026  風間青祢

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
```