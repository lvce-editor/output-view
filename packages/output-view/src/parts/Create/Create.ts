import type { OutputState } from '../OutputState/OutputState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number, platform: number, parentId: number): void => {
  Assert.number(parentId)
  const state: OutputState = {
    uid: id,
    parentId,
    uri,
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
    selectedOption: '',
    smallWidthBreakPoint: 650,
    workspaceUri: '',
    options: [],
    error: '',
    errorCode: 0,
    buttons: [],
    filteredItems: [],
    platform,
    watchId: 0,
  }
  OutputStates.set(id, state, state)
}
