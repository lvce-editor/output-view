import type { OutputState } from '../OutputState/OutputState.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const saveOutputAs = async (state: OutputState): Promise<OutputState> => {
  // @ts-ignore
  const uri = await RendererWorker.invoke('FilePicker.showSaveFilePicker')
  if (!uri) {
    return state
  }
  const { listItems } = state
  const content = listItems.join('\n')
  await FileSystemWorker.writeFile(uri, content)
  // TODO if error occurs, show error dialog
  return state
}
