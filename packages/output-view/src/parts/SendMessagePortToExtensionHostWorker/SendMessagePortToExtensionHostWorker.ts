import { RendererWorker } from '@lvce-editor/rpc-registry'

export const sendMessagePortToExtensionHostWorker2 = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port)
}
