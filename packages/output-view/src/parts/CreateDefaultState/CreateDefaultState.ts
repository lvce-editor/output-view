import type { OutputState } from '../OutputState/OutputState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const createDefaultState = (): OutputState => {
  const state: OutputState = {
    uid: 0,
    focusedIndex: -2,
    message: '',
    itemHeight: 22,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
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
    uri: '',
    error: '',
  }
  return state
}
