import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import type { LoadLinesResult } from '../LoadLinesResult/LoadLinesResult.ts'
import { aggregateLines } from '../AggregateLines/AggregateLines.ts'
import { invokeExtensionCommand } from '../InvokeExtensionCommand/InvokeExtensionCommand.ts'
import { isExtensionOutputUri } from '../IsExtensionOutputUri/IsExtensionOutputUri.ts'
import { isFileNotFoundError } from '../IsFileNotFoundError/IsFileNotFoundError.ts'
import { parseLine } from '../ParseLine/ParseLine.ts'

const readOutput = async (uri: string, applicationId?: string): Promise<string> => {
  if (isExtensionOutputUri(uri)) {
    return invokeExtensionCommand(applicationId, 'Extensions.readOutputChannel', uri)
  }
  return FileSystemWorker.readFile(uri)
}

export const loadLines = async (uri: string, parseLinks = true, applicationId?: string): Promise<LoadLinesResult> => {
  try {
    const content = await readOutput(uri, applicationId)
    const lines = aggregateLines(content.split('\n').map((line) => parseLine(line, parseLinks)))
    return {
      code: 0,
      error: '',
      lines,
    }
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return {
        code: 1,
        error: 'log file not found',
        lines: [],
      }
    }
    return {
      code: 2,
      error: String(error),
      lines: [],
    }
  }
}
