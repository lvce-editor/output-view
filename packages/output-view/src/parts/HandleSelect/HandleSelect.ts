import type { OutputState } from '../OutputState/OutputState.ts'
import { selectChannel } from '../SelectChannel/SelectChannel.ts'

export const handleSelect = async (state: OutputState, id: string): Promise<OutputState> => {
  return selectChannel(state, id)
}
