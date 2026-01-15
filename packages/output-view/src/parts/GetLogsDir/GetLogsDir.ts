import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getLogsDir = async (): Promise<string> => {
  try {
    return await RendererWorker.getLogsDir()
  } catch {
    return `file:///tmp`
  }
}
