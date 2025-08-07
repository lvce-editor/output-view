import type { OutputState } from '../OutputState/OutputState.ts'

export const isEqual = (oldState: OutputState, newState: OutputState): boolean => {
  return oldState.filterValue === newState.filterValue && oldState.message === newState.message
}
