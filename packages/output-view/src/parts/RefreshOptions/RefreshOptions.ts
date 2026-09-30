import type { OutputState } from '../OutputState/OutputState.ts'
import { createWatchId } from '../CreateWatchId/CreateWatchId.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import { isExtensionOutputUri } from '../IsExtensionOutputUri/IsExtensionOutputUri.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'
import { loadOptions } from '../LoadOptions/LoadOptions.ts'
import { setupChangeListener } from '../SetupChangeListener/SetupChangeListener.ts'

export const refreshOptions = async (state: OutputState): Promise<OutputState> => {
  const { filterValue, platform, selectedOption, watchId } = state
  const options = await loadOptions(platform)
  const option = options.find((option) => option.id === selectedOption) || options[0]
  if (!option) {
    await setupChangeListener(watchId, 0, '')
    return {
      ...state,
      error: '',
      errorCode: 0,
      filteredItems: [],
      listItems: [],
      options,
      selectedOption: '',
      watchId: 0,
    }
  }
  if (option.id === selectedOption) {
    return {
      ...state,
      options,
    }
  }
  const { code, error, lines } = await loadLines(option.uri, option.parseLinks)
  const filteredItems = filterItems(lines, filterValue)
  const newWatchId = isExtensionOutputUri(option.uri) ? 0 : createWatchId()
  await setupChangeListener(watchId, newWatchId, option.uri)
  return {
    ...state,
    error,
    errorCode: code,
    filteredItems,
    listItems: lines,
    options,
    selectedOption: option.id,
    watchId: newWatchId,
  }
}
