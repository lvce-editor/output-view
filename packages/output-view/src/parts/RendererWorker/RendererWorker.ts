import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  invoke,

  sendMessagePortToExtensionHostWorker,
  sendMessagePortToFileSystemWorker,

  set,

  activateByEvent,
} = RendererWorker
