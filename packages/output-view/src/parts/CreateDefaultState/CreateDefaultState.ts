import type { OutputState } from '../OutputState/OutputState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const createDefaultState = (): OutputState => {
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
    height: 0,
    inputSource: InputSource.User,
    itemHeight: 18,
    listItems: [],
    logLevel: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    options: [],
    parentId: 0,
    platform: 0,
    scrollBarActive: false,
    scrollBarHeight: 0,
    scrollLockEnabled: false,
    selectedOption: '',
    smallWidthBreakPoint: 650,
    uid: 0,
    uri: '',
    watchId: 0,
    width: 0,
    workspaceUri: '',
    x: 0,
    y: 0,
  }
  return state
}
