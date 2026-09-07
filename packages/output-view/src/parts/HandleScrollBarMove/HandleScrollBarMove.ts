import type { OutputState } from '../OutputState/OutputState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleScrollBarMove = (state: OutputState, eventY: number): OutputState => {
  const { finalDeltaY, handleOffset, height, scrollBarActive, scrollBarHeight, y } = state
  if (!scrollBarActive) {
    return state
  }
  const trackHeight = height - scrollBarHeight
  const deltaY = trackHeight > 0 ? ((eventY - y - handleOffset) / trackHeight) * finalDeltaY : 0
  return setDeltaY(state, deltaY)
}
