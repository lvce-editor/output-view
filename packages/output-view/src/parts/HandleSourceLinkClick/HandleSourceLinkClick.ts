import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { OutputState } from '../OutputState/OutputState.ts'

export const handleSourceLinkClick = async (state: OutputState, uri: string): Promise<OutputState> => {
  if (!uri) {
    return state
  }
  await RendererWorker.invoke('Main.openUri', uri)
  return state
}
