import type { OutputState } from '../OutputState/OutputState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number, workspaceUri: string): void => {
  const state: OutputState = {
    uid: id,
    focusedIndex: -2,
    message: '',
    itemHeight: 22,
    x,
    y,
    width,
    height,
    filterValue: '',
    inputSource: InputSource.User,
    minLineY: 0,
    maxLineY: 0,
    listItems: [],
    collapsedUris: [],
    smallWidthBreakPoint: 650,
    workspaceUri,
    options: [],
  }
  OutputStates.set(id, state, state)
}
