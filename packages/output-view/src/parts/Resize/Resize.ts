import type { OutputState } from '../OutputState/OutputState.ts'

export const resize = (state: OutputState, dimensions: any): OutputState => {
  return {
    ...state,
    ...dimensions,
  }
}
