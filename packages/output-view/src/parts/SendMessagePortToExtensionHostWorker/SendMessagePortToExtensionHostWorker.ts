import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const sendMessagePortToExtensionHostWorker2 = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port)
}
