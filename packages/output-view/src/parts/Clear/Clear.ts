import type { OutputState } from '../OutputState/OutputState.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'

export const clear = async (state: OutputState): Promise<OutputState> => {
  const { filterValue, options, selectedOption } = state
  // TODO make uri a property of state to make the code simpler
  const option = options.find((option) => option.id === selectedOption)
  if (!option) {
    return state
  }
  const { uri } = option
  await FileSystemWorker.writeFile(uri, '')
  const { code, error, lines } = await loadLines(uri)
  const filteredItems = filterItems(lines, filterValue)
  return {
    ...state,
    error,
    errorCode: code,
    filteredItems,
    listItems: lines,
  }
}
