const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('llamaDesktop', {
  getState: () => ipcRenderer.invoke('llama:get-state'),
  saveConfig: payload => ipcRenderer.invoke('llama:save-config', payload),
  startServer: payload => ipcRenderer.invoke('llama:start-server', payload),
  stopServer: () => ipcRenderer.invoke('llama:stop-server'),
  testHealth: payload => ipcRenderer.invoke('llama:test-health', payload),
  chatCompletion: payload => ipcRenderer.invoke('llama:chat-completion', payload),
  streamChat: payload => ipcRenderer.invoke('llama:chat-stream', payload),
  getModelInfo: payload => ipcRenderer.invoke('llama:get-model-info', payload),
  pickFile: options => ipcRenderer.invoke('llama:pick-file', options?.properties ? options : { filters: options }),
  pickAttachments: payload => ipcRenderer.invoke('llama:pick-attachments', payload),
  revealPath: filePath => ipcRenderer.invoke('llama:reveal-path', { filePath }),
  openUrl: url => ipcRenderer.invoke('llama:open-url', { url }),
  mcpList: () => ipcRenderer.invoke('llama:mcp-list'),
  mcpAdd: cfg => ipcRenderer.invoke('llama:mcp-add', cfg),
  mcpRemove: id => ipcRenderer.invoke('llama:mcp-remove', id),
  mcpRestart: id => ipcRenderer.invoke('llama:mcp-restart', id),
  mcpGetTools: () => ipcRenderer.invoke('llama:mcp-get-tools'),
  mcpCallTool: tc => ipcRenderer.invoke('llama:mcp-call-tool', tc),
  onEvent: callback => {
    const handler = (_event, payload) => callback(payload)
    ipcRenderer.on('llama:event', handler)
    return () => ipcRenderer.removeListener('llama:event', handler)
  },
})
