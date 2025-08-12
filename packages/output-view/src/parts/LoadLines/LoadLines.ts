import { RendererWorker } from '@lvce-editor/rpc-registry'

export const loadLines = async (uri: string): Promise<readonly string[]> => {
  // TODO use log stream, updating the output when the file is changed
  const content = await RendererWorker.invoke('FileSystem.readFile', uri)
  const lines = content.split('\n')
  return lines
}
