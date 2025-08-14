import type { OutputState } from '../OutputState/OutputState.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'

export const selectChannel = async (state: OutputState, id: string): Promise<OutputState> => {
  const { options, filterValue } = state
  const matchingOption = options.find((option) => option.id === id)
  if (!matchingOption) {
    return state
  }
  // TODO potential race condtion when switching output channels fast
  const { lines, error, code } = await loadLines(matchingOption.uri)
  const filteredItems = filterItems(lines, filterValue)
  return {
    ...state,
    error,
    errorCode: code,
    listItems: lines,
    filteredItems,
    selectedOption: id,
  }
}
