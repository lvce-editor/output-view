import type { OutputState } from '../OutputState/OutputState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import { getScrollBarTop } from '../GetScrollBarTop/GetScrollBarTop.ts'

export const renderCss = (oldState: OutputState, newState: OutputState): ViewletCommand => {
  const { deltaY, itemHeight, minLineY, scrollBarHeight, uid } = newState
  const offset = minLineY * itemHeight - deltaY
  const css = `.Output {
  position: relative;
  overflow: hidden;
}
.OutputContent {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  padding-right: ${scrollBarHeight > 0 ? 14 : 0}px;
}
.OutputContent::-webkit-scrollbar {
  display: none;
}
.Output .Line {
  height: ${itemHeight}px;
  min-height: ${itemHeight}px;
  line-height: ${itemHeight}px;
}
.Output .Line:first-child {
  margin-top: ${offset}px;
}
.Output .ScrollBarThumb {
  height: ${scrollBarHeight}px;
  translate: 0 ${getScrollBarTop(newState)}px;
}`
  return ['Viewlet.setCss', uid, css]
}
