import type { OutputState } from '../OutputState/OutputState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: OutputState): SavedState => {
  const { collapsedUris, filterValue, scrollLockEnabled, selectedOption } = state
  return {
    collapsedUris,
    filterValue,
    scrollLockEnabled,
    selectedOption,
  }
}
