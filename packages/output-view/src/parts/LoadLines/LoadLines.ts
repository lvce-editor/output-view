import type { LoadLinesResult } from '../LoadLinesResult/LoadLinesResult.ts'
import { parseLine } from '../ParseLine/ParseLine.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import { isFileNotFoundError } from '../IsFileNotFoundError/IsFileNotFoundError.ts'

export const loadLines = async (uri: string): Promise<LoadLinesResult> => {
  try {
    // TODO use log stream, updating the output when the file is changed
    const content = await FileSystemWorker.readFile(uri)
    const lines = content.split('\n').map(parseLine)
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
