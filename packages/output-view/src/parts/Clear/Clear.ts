import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import type { OutputState } from '../OutputState/OutputState.ts'
import { filterItems } from '../FilterItems/FilterItems.ts'
import { invokeExtensionCommand } from '../InvokeExtensionCommand/InvokeExtensionCommand.ts'
import { isExtensionOutputUri } from '../IsExtensionOutputUri/IsExtensionOutputUri.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'

const clearOutput = async (uri: string, applicationId?: string): Promise<void> => {
  if (isExtensionOutputUri(uri)) {
    await invokeExtensionCommand(applicationId, 'Extensions.clearOutputChannel', uri)
    return
  }
  await FileSystemWorker.writeFile(uri, '')
}

export const clear = async (state: OutputState): Promise<OutputState> => {
  const { applicationId, filterValue, options, selectedOption } = state
  // TODO make uri a property of state to make the code simpler
  const option = options.find((option) => option.id === selectedOption)
  if (!option) {
    return state
  }
  const { uri } = option
  await clearOutput(uri, applicationId)
  const { code, error, lines } = await loadLines(uri, option.parseLinks, applicationId)
  const filteredItems = filterItems(lines, filterValue)
  return {
    ...state,
    error,
    errorCode: code,
    filteredItems,
    listItems: lines,
  }
}
