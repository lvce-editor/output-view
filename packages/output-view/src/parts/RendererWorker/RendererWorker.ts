import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  activateByEvent,

  invoke,
  sendMessagePortToExtensionHostWorker,

  sendMessagePortToFileSystemWorker,

  set,
} = RendererWorker
