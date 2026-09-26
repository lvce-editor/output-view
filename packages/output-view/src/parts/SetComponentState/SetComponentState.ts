import type { OutputState } from '../OutputState/OutputState.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

const applyComponentState = (currentState: OutputState, state: OutputState): OutputState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Output state must be an object')
  }
  const { uid } = state
  const { uid: currentUid } = currentState
  if (uid !== currentUid) {
    throw new Error(`Output state uid must remain ${currentUid}`)
  }
  return { ...state, watchId: currentState.watchId }
}

export const setComponentState = OutputStates.wrapCommand(applyComponentState)
