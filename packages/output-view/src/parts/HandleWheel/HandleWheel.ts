import type { OutputState } from '../OutputState/OutputState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleWheel = (state: OutputState, deltaMode: number, deltaY: number): OutputState => {
  const { deltaY: currentDeltaY, height, itemHeight } = state
  let multiplier = 1
  if (deltaMode === 1) {
    multiplier = itemHeight
  } else if (deltaMode === 2) {
    multiplier = height
  }
  return setDeltaY(state, currentDeltaY + deltaY * multiplier)
}
