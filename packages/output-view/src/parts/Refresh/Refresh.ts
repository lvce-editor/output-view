import type { OutputState } from '../OutputState/OutputState.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'

export const refresh = async (state: OutputState): Promise<OutputState> => {
  const { filterValue, options, selectedOption } = state
  const matchingOption = options.find((option) => option.id === selectedOption)
  if (!matchingOption) {
    return state
  }
  const { lines, error, code } = await loadLines(matchingOption.uri)
  const filteredItems = filterItems(lines, filterValue)
  return {
    ...state,
    listItems: lines,
    filteredItems,
    error,
    errorCode: code,
  }
}
