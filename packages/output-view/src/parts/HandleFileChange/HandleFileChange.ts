import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const handleFileChange = async (watchId: number): Promise<void> => {
  const keys = OutputStates.getKeys()
  for (const key of keys) {
    const instance = OutputStates.get(key)
    if (instance.newState.watchId === watchId) {
      // @ts-ignore
      await RendererWorker.invoke('Output.refresh')
    }
  }
}
