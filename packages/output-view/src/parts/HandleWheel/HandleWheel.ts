import type { OutputState } from '../OutputState/OutputState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleWheel = (state: OutputState, deltaMode: number, deltaY: number): OutputState => {
  const multiplier = deltaMode === 1 ? state.itemHeight : deltaMode === 2 ? state.height : 1
  return setDeltaY(state, state.deltaY + deltaY * multiplier)
}
