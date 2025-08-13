import type { Option } from '../Option/Option.ts'
import type { OutputState } from '../OutputState/OutputState.ts'
import { getSelectedItem } from '../GetSelectedItem/GetSelectedItem.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { loadButtons } from '../LoadButtons/LoadButtons.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'
import { loadOptions } from '../LoadOptions/LoadOptions.ts'

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
  const { platform } = state
  const collapsedUris = getSavedCollapsedUris(savedState)
  const selectedId = getSelectedItem(platform)
  const options = await loadOptions(platform)
  const option = getMatchingOpen(options, selectedId)
  if (!option) {
    throw new Error('option not found')
  }
  const {uri} = option
  const { lines, error, code } = await loadLines(uri)
  const buttons = loadButtons()
  return {
    ...state,
    collapsedUris,
    error,
    errorCode: code,
    inputSource: InputSource.Script,
    listItems: lines,
    filteredItems: lines,
    options,
    selectedOption: selectedId,
    buttons,
  }
}
