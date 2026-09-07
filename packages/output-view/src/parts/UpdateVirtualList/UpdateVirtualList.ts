import type { OutputState } from '../OutputState/OutputState.ts'

export const updateVirtualList = (state: OutputState, requestedDeltaY?: number): OutputState => {
  const { filteredItems, followOutput, height, itemHeight, scrollLockEnabled } = state
  const listHeight = Math.max(0, height)
  const contentHeight = filteredItems.length * itemHeight
  const finalDeltaY = Math.max(0, contentHeight - listHeight)
  const requested = requestedDeltaY ?? (followOutput && !scrollLockEnabled ? finalDeltaY : state.deltaY)
  const deltaY = Math.max(0, Math.min(Number.isFinite(requested) ? requested : 0, finalDeltaY))
  const minLineY = itemHeight > 0 ? Math.floor(deltaY / itemHeight) : 0
  const maxLineY = itemHeight > 0 && listHeight > 0 ? Math.min(filteredItems.length, Math.ceil((deltaY + listHeight) / itemHeight)) : minLineY
  const scrollBarHeight = finalDeltaY > 0 && listHeight > 0 ? Math.min(listHeight, Math.max(20, listHeight ** 2 / contentHeight)) : 0
  return { ...state, deltaY, finalDeltaY, maxLineY, minLineY, scrollBarHeight }
}
