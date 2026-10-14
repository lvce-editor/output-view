import type { Option } from '../Option/Option.ts'
import { invokeExtensionCommand } from '../InvokeExtensionCommand/InvokeExtensionCommand.ts'
import * as Logger from '../Logger/Logger.ts'

export const getExtensionOptions = async (applicationId?: string): Promise<readonly Option[]> => {
  try {
    const channels = await invokeExtensionCommand(applicationId, 'Extensions.getOutputChannelProviders')
    return channels
  } catch (error) {
    Logger.error(error)
    return []
  }
}
