import type { OutputState } from '../OutputState/OutputState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: OutputState): SavedState => {
  const { filterValue, collapsedUris, selectedOption, scrollLockEnabled } = state
  return {
    filterValue,
    collapsedUris,
    selectedOption,
    scrollLockEnabled,
  }
}
