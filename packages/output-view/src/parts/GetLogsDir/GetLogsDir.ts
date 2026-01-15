import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getLogsDir = async (): Promise<string> => {
  try {
    // @ts-ignore
    return await RendererWorker.invoke('PlatformPaths.getLogsDir')
  } catch {
    return `file:///tmp`
  }
}
