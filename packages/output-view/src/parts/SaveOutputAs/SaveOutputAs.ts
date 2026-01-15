import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { OutputState } from '../OutputState/OutputState.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import { serializeLines } from '../SerializeLines/SerializeLines.ts'

export const saveOutputAs = async (state: OutputState): Promise<OutputState> => {
  const uri = await RendererWorker.showSaveFilePicker()
  if (!uri) {
    return state
  }
  const { listItems } = state
  const content = serializeLines(listItems)
  await FileSystemWorker.writeFile(uri, content)
  // TODO if error occurs, show error dialog
  return state
}
