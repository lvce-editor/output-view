import type { OutputState } from '../OutputState/OutputState.ts'

export const isEqual = (oldState: OutputState, newState: OutputState): boolean => {
  return oldState.selectedOption === newState.selectedOption
}
