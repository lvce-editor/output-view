import type { OutputState } from '../OutputState/OutputState.ts'
import { getScrollBarTop } from '../GetScrollBarTop/GetScrollBarTop.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleScrollBarClick = (state: OutputState, eventY: number): OutputState => {
  const { finalDeltaY, height, scrollBarHeight, y } = state
  if (scrollBarHeight <= 0) {
    return state
  }
  const relativeY = eventY - y
  const offset = relativeY - getScrollBarTop(state)
  if (offset >= 0 && offset < scrollBarHeight) {
    return { ...state, handleOffset: offset, scrollBarActive: true }
  }
  const handleOffset = scrollBarHeight / 2
  const trackHeight = height - scrollBarHeight
  const deltaY = trackHeight > 0 ? ((relativeY - handleOffset) / trackHeight) * finalDeltaY : 0
  return { ...setDeltaY(state, deltaY), handleOffset, scrollBarActive: true }
}
