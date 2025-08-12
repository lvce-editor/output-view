import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { LoadLinesResult } from '../LoadLinesResult/LoadLinesResult.ts'
import { isFileNotFoundError } from '../IsFileNotFoundError/IsFileNotFoundError.ts'

export const loadLines = async (uri: string): Promise<LoadLinesResult> => {
  try {
    // TODO use log stream, updating the output when the file is changed
    const content = await RendererWorker.invoke('FileSystem.readFile', uri)
    const lines = content.split('\n')
    return {
      error: '',
      lines,
      code: 0,
    }
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return {
        error: `log file not found`,
        lines: [],
        code: 1,
      }
    }
    return {
      error: `${error}`,
      lines: [],
      code: 2,
    }
  }
}
