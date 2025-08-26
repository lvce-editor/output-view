// no local use of Line/LinePart here; serializeLines handles typing
import type { OutputState } from '../OutputState/OutputState.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import { serializeLines } from '../SerializeLines/SerializeLines.ts'

// moved to SerializeLines.ts

export const saveOutputAs = async (state: OutputState): Promise<OutputState> => {
  // @ts-ignore
  const uri = await RendererWorker.invoke('FilePicker.showSaveFilePicker')
  if (!uri) {
    return state
  }
  const { listItems } = state
  const content = serializeLines(listItems)
  await FileSystemWorker.writeFile(uri, content)
  // TODO if error occurs, show error dialog
  return state
}
