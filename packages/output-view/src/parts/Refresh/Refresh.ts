import type { OutputState } from '../OutputState/OutputState.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'

export const refresh = async (state: OutputState): Promise<OutputState> => {
  const { uri, filterValue } = state
  const { lines, error, code } = await loadLines(uri)
  const filteredItems = filterItems(lines, filterValue)
  return {
    ...state,
    listItems: lines,
    filteredItems,
    error,
    errorCode: code,
  }
}
