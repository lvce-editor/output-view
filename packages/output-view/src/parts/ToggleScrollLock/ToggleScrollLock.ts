import type { OutputState } from '../OutputState/OutputState.ts'
import { disableScrollLock } from '../DisableScrollLock/DisableScrollLock.ts'
import { enableScrollLock } from '../EnableScrollLock/EnableScrollLock.ts'

export const toggleScrollLock = async (state: OutputState): Promise<OutputState> => {
  const { scrollLockEnabled } = state
  if (scrollLockEnabled) {
    return disableScrollLock(state)
  }
  return enableScrollLock(state)
}
