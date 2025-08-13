import type { OutputState } from '../OutputState/OutputState.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'

export const handleFilterInput = async (state: OutputState, value: string): Promise<OutputState> => {
  const { listItems } = state
  const filteredItems = filterItems(listItems, value)
  return {
    ...state,
    filterValue: value,
    filteredItems: filteredItems,
  }
}
