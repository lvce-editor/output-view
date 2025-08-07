import type { OutputState } from '../OutputState/OutputState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const isEqual = (oldState: OutputState, newState: OutputState): boolean => {
  return newState.inputSource === InputSource.User || oldState.filterValue === newState.filterValue
}
