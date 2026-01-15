import type { Option } from '../Option/Option.ts'
import type { OutputState } from '../OutputState/OutputState.ts'
import { createWatchId } from '../CreateWatchId/CreateWatchId.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import { getLogsDir } from '../GetLogsDir/GetLogsDir.ts'
import { getSelectedItem } from '../GetSelectedItem/GetSelectedItem.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { loadButtons } from '../LoadButtons/LoadButtons.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'
import { loadOptions } from '../LoadOptions/LoadOptions.ts'
import { restoreState } from '../RestoreState/RestoreState.ts'
import { setupChangeListener } from '../SetupChangeListener/SetupChangeListener.ts'

const isString = (value: unknown): boolean => {
  return typeof value === 'string'
}

const getSavedCollapsedUris = (savedState: any): readonly string[] => {
  if (savedState && savedState.collapsedUris && Array.isArray(savedState.collapsedUris) && savedState.collapsedUris.every(isString)) {
    return savedState.collapsedUris
  }
  return []
}

const getMatchingOpen = (options: readonly Option[], id: string): Option | undefined => {
  return options.find((option) => option.id === id) || options[0]
}

export const loadContent = async (state: OutputState, savedState: any): Promise<OutputState> => {
  const { platform, watchId } = state
  const collapsedUris = getSavedCollapsedUris(savedState)
  const logsFolderPath = await getLogsDir()
  const { filterValue, scrollLockEnabled, selectedOption } = restoreState(savedState)
  const selectedId = getSelectedItem(selectedOption, platform)
  const options = await loadOptions(platform, logsFolderPath)
  const option = getMatchingOpen(options, selectedId)
  if (!option) {
    throw new Error('option not found')
  }
  const { uri } = option
  const { code, error, lines } = await loadLines(uri)
  const filteredItems = filterItems(lines, filterValue)
  const newWatchId = createWatchId()
  await setupChangeListener(watchId, newWatchId, uri)
  const buttons = loadButtons()
  return {
    ...state,
    buttons,
    collapsedUris,
    error,
    errorCode: code,
    filteredItems,
    filterValue,
    inputSource: InputSource.Script,
    listItems: lines,
    options,
    scrollLockEnabled,
    selectedOption: selectedId,
    watchId: newWatchId,
  }
}
