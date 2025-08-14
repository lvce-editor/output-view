import type { Option } from '../Option/Option.ts'
import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'
import * as Logger from '../Logger/Logger.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getExtensionOptions = async (): Promise<readonly Option[]> => {
  try {
    // TODO make api more declarative:
    // output channels are registered in extension manifest
    // only downside: it might show channels for extensions that are not active
    await RendererWorker.activateByEvent('onOutput')
    // @ts-ignore
    const channels = await ExtensionHostWorker.invoke('Output.getEnabledProviders')
    return channels
  } catch (error) {
    Logger.error(error)
    return []
  }
}
