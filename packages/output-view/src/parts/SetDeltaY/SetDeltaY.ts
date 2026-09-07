import type { OutputState } from '../OutputState/OutputState.ts'
import { updateVirtualList } from '../UpdateVirtualList/UpdateVirtualList.ts'

export const setDeltaY = (state: OutputState, deltaY: number): OutputState => {
  const newState = updateVirtualList(state, deltaY)
  return { ...newState, followOutput: newState.deltaY === newState.finalDeltaY }
}
