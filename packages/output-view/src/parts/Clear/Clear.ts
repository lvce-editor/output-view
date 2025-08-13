import type { OutputState } from '../OutputState/OutputState.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'

export const clear = async (state: OutputState): Promise<OutputState> => {
  const { selectedOption, options } = state
  const option = options.find((option) => option.id === selectedOption)
  if (!option) {
    return state
  }
  const { uri } = option
  await FileSystemWorker.writeFile(uri, '')
  const { lines, code, error } = await loadLines(uri)
  return {
    ...state,
    listItems: lines,
    error,
    errorCode: code,
  }
}
