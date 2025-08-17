import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getLogsDir = async (): Promise<string> => {
  try {
    // @ts-ignore
    return await RendererWorker.invoke('PlatformPaths.getLogsDir')
  } catch {
    return `file:///tmp`
  }
}
