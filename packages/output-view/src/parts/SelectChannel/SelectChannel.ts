import type { OutputState } from '../OutputState/OutputState.ts'
import { createWatchId } from '../CreateWatchId/CreateWatchId.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'
import { setupChangeListener } from '../SetupChangeListener/SetupChangeListener.ts'

export const selectChannel = async (state: OutputState, id: string): Promise<OutputState> => {
  const { filterValue, options, watchId } = state
  const matchingOption = options.find((option) => option.id === id)
  if (!matchingOption) {
    return state
  }
  // TODO potential race condtion when switching output channels fast
  const { code, error, lines } = await loadLines(matchingOption.uri)

  // TODO memory leak and race condition, need to dispose file watcher of previous uri
  const newWatchId = createWatchId()
  await setupChangeListener(watchId, newWatchId, matchingOption.uri)

  const filteredItems = filterItems(lines, filterValue)
  return {
    ...state,
    error,
    errorCode: code,
    filteredItems,
    listItems: lines,
    selectedOption: id,
    watchId: newWatchId,
  }
}
