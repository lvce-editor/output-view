import type { OutputState } from '../OutputState/OutputState.ts'

export const getScrollBarTop = (state: OutputState): number => {
  const { deltaY, finalDeltaY, height, scrollBarHeight } = state
  return finalDeltaY > 0 ? (deltaY / finalDeltaY) * (height - scrollBarHeight) : 0
}
