import type { OutputState } from '../OutputState/OutputState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

export const handleKeyDown = (state: OutputState, key: string): OutputState => {
  const { deltaY, finalDeltaY, height, itemHeight } = state
  switch (key) {
    case 'ArrowDown':
      return setDeltaY(state, deltaY + itemHeight)
    case 'ArrowUp':
      return setDeltaY(state, deltaY - itemHeight)
    case 'End':
      return setDeltaY(state, finalDeltaY)
    case 'Home':
      return setDeltaY(state, 0)
    case 'PageDown':
      return setDeltaY(state, deltaY + height)
    case 'PageUp':
      return setDeltaY(state, deltaY - height)
    default:
      return state
  }
}
