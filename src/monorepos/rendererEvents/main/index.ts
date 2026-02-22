qwqnt.main.hooks.whenBrowserWindowCreated.peek(window => {
  const trigged: string[] = [];

  IpcInterceptor.onIpcSendEvents('nodeIKernelSessionListener/onSessionInitComplete', (...args) => {
    window.webContents.send('RendererEvents.onLogin', args[2].payload.uid);
  });

  window.webContents.on('did-navigate-in-page', (_, url) => {
    const hash = new URL(url).hash;

    if(hash === '#/setting/settings/common' && !trigged.includes(hash)){
      trigged.push(hash);
      window.webContents.send('RendererEvents.onSettingsWindowCreated');
    }
    if(hash === '#/main/message' && !trigged.includes(hash)){
      trigged.push(hash);
      window.webContents.send('RendererEvents.onMessageWindowCreated');
    }
  });
});