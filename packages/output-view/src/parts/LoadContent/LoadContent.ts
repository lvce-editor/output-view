import type { OutputState } from '../OutputState/OutputState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

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
  return {
    ...state,
    inputSource: InputSource.Script,
    listItems: [],
    collapsedUris,
    options: [],
  }
}
