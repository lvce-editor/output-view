import type { OutputState } from '../OutputState/OutputState.ts'

export const handleScrollBarCaptureLost = (state: OutputState): OutputState => {
  return { ...state, scrollBarActive: false }
}
