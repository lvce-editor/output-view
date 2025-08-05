import type { OutputState } from '../OutputState/OutputState.ts'

export const focusIndex = (state: OutputState, index: number): OutputState => {
  return {
    ...state,
    focusedIndex: index,
  }
}
