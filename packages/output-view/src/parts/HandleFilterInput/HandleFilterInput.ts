import type { OutputState } from '../OutputState/OutputState.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleFilterInput = async (state: OutputState, value: string, inputSource: number = InputSource.User): Promise<OutputState> => {
  const { listItems } = state
  const filteredItems = filterItems(listItems, value)
  return {
    ...state,
    filterValue: value,
    filteredItems: filteredItems,
    inputSource,
  }
}
