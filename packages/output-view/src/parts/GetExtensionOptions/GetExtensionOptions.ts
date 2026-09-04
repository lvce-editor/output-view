import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { Option } from '../Option/Option.ts'
import * as Logger from '../Logger/Logger.ts'

export const getExtensionOptions = async (): Promise<readonly Option[]> => {
  try {
    const channels = await ExtensionManagementWorker.invoke('Extensions.getOutputChannelProviders')
    return channels
  } catch (error) {
    Logger.error(error)
    return []
  }
}
