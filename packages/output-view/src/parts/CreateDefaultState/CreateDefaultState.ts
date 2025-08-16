import type { OutputState } from '../OutputState/OutputState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const createDefaultState = (): OutputState => {
  const state: OutputState = {
    buttons: [],
    collapsedUris: [],
    error: '',
    errorCode: 0,
    filteredItems: [],
    filterValue: '',
    focusedIndex: -2,
    height: 0,
    inputSource: InputSource.User,
    itemHeight: 22,
    listItems: [],
    logLevel: 0,
    maxLineY: 0,
    message: '',
    minLineY: 0,
    options: [],
    parentId: 0,
    platform: 0,
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
