import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { OutputState } from '../OutputState/OutputState.ts'

export const handleSourceLinkClick = async (
  state: OutputState,
  uri: string,
  lineNumber?: string | number,
  columnNumber?: string | number,
): Promise<OutputState> => {
  if (!uri) {
    return state
  }
  const line = Number(lineNumber)
  if (!Number.isSafeInteger(line) || line <= 0) {
    await RendererWorker.invoke('Main.openUri', uri)
    return state
  }
  const column = Number(columnNumber)
  const rowIndex = line - 1
  const columnIndex = Number.isSafeInteger(column) && column > 0 ? column - 1 : 0
  await RendererWorker.invoke('Main.openUri', uri, true, {
    selections: new Uint32Array([rowIndex, columnIndex, rowIndex, columnIndex]),
  })
  return state
}
