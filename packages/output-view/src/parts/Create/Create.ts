import type { OutputState } from '../OutputState/OutputState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const create = (id: number, uri: string, x: number, y: number, width: number, height: number, platform: number, parentId: number): void => {
  Assert.number(parentId)
  const state: OutputState = {
    buttons: [],
    collapsedUris: [],
    deltaY: 0,
    error: '',
    errorCode: 0,
    filteredItems: [],
    filterValue: '',
    finalDeltaY: 0,
    focusedIndex: -2,
    followOutput: true,
    handleOffset: 0,
    height,
    inputSource: InputSource.User,
    itemHeight: 18,
    listItems: [],
    logLevel: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    options: [],
    parentId,
    platform,
    scrollBarActive: false,
    scrollBarHeight: 0,
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
