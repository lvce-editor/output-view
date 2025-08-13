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

export const loadContent = async (state: OutputState, savedState: any): Promise<OutputState> => {
  const { platform } = state
  const collapsedUris = getSavedCollapsedUris(savedState)
  const selectedId = getSelectedItem(platform)
  const options = await loadOptions(platform)
  const uri = options.find((option) => option.id === selectedId)?.uri
  if (!uri) {
    throw new Error('option not found')
  }
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
