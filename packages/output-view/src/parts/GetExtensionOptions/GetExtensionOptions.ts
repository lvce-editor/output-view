import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const getExtensionOptions = async (): Promise<readonly any[]> => {
  try {
    // @ts-ignore
    const channels = await ExtensionHostWorker.invoke('ExtensionHost.getOutputChannels')
    return channels
  } catch {
    return []
  }
}
