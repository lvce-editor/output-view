import type { OutputState } from '../OutputState/OutputState.ts'

export const disableScrollLock = async (state: OutputState): Promise<OutputState> => {
  const { scrollLockEnabled } = state
  if (!scrollLockEnabled) {
    return state
  }
  return {
    ...state,
    scrollLockEnabled: false,
  }
}
