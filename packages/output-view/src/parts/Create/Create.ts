import type { OutputState } from '../OutputState/OutputState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number, platform: number, parentId: number): void => {
  Assert.number(parentId)
  const state: OutputState = {
    buttons: [],
    collapsedUris: [],
    error: '',
    errorCode: 0,
    filteredItems: [],
    filterValue: '',
    focusedIndex: -2,
    height,
    inputSource: InputSource.User,
    itemHeight: 22,
    listItems: [],
    logLevel: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    options: [],
    parentId,
    platform,
    scrollLockEnabled: false,
    selectedOption: '',
    smallWidthBreakPoint: 650,
    uid: id,
    uri,
    watchId: 0,
    width,
    workspaceUri: '',
    x,
    y,
  }
  OutputStates.set(id, state, state)
}
