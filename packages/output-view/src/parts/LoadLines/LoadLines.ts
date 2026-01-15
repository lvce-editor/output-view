import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import type { LoadLinesResult } from '../LoadLinesResult/LoadLinesResult.ts'
import { isFileNotFoundError } from '../IsFileNotFoundError/IsFileNotFoundError.ts'
import { parseLine } from '../ParseLine/ParseLine.ts'

export const loadLines = async (uri: string): Promise<LoadLinesResult> => {
  try {
    // TODO use log stream, updating the output when the file is changed
    const content = await FileSystemWorker.readFile(uri)
    const lines = content.split('\n').map(parseLine)
    return {
      code: 0,
      error: '',
      lines,
    }
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return {
        code: 1,
        error: `log file not found`,
        lines: [],
      }
    }
    return {
      code: 2,
      error: `${error}`,
      lines: [],
    }
  }
}
