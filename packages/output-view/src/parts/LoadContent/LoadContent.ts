import type { OutputState } from '../OutputState/OutputState.ts'
import { getSelectedItem } from '../GetSelectedItem/GetSelectedItem.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'

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
  const collapsedUris = getSavedCollapsedUris(savedState)
  const platform = /* Electron */ 4
  const selectedUri = getSelectedItem(platform)
  const { lines, error, code } = await loadLines(selectedUri)
  return {
    ...state,
    collapsedUris,
    error,
    errorCode: code,
    inputSource: InputSource.Script,
    listItems: lines,
    options: [],
    selectedOption: selectedUri,
  }
}
