import type { OutputState } from '../OutputState/OutputState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleKeyDown = (state: OutputState, key: string): OutputState => {
  switch (key) {
    case 'ArrowDown':
      return setDeltaY(state, state.deltaY + state.itemHeight)
    case 'ArrowUp':
      return setDeltaY(state, state.deltaY - state.itemHeight)
    case 'End':
      return setDeltaY(state, state.finalDeltaY)
    case 'Home':
      return setDeltaY(state, 0)
    case 'PageDown':
      return setDeltaY(state, state.deltaY + state.height)
    case 'PageUp':
      return setDeltaY(state, state.deltaY - state.height)
    default:
      return state
  }
}
