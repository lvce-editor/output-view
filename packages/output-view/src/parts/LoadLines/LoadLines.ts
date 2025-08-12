import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { LoadLinesResult } from '../LoadLinesResult/LoadLinesResult.ts'

export const loadLines = async (uri: string): Promise<LoadLinesResult> => {
  try {
    // TODO use log stream, updating the output when the file is changed
    const content = await RendererWorker.invoke('FileSystem.readFile', uri)
    const lines = content.split('\n')
    return {
      error: '',
      lines,
    }
  } catch (error) {
    return {
      error: `${error}`,
      lines: [],
    }
  }
}
