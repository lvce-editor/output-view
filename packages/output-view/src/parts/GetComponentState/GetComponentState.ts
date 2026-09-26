import type { OutputState } from '../OutputState/OutputState.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const getComponentState = (uid: number): OutputState => {
  return OutputStates.get(uid).newState
}
