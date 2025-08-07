import type { OutputState } from '../OutputState/OutputState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: OutputState): SavedState => {
  const { filterValue, collapsedUris } = state
  return {
    filterValue,
    collapsedUris,
  }
}
