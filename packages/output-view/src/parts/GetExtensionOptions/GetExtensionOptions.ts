import type { Option } from '../Option/Option.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const getExtensionOptions = async (): Promise<readonly Option[]> => {
  try {
    // @ts-ignore
    const channels = await ExtensionHostWorker.invoke('ExtensionHost.getEnabledProviders')
    return channels
  } catch {
    return []
  }
}
