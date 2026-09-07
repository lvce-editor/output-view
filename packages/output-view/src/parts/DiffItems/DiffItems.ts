import type { OutputState } from '../OutputState/OutputState.ts'

export const isEqual = (oldState: OutputState, newState: OutputState): boolean => {
  return (
    oldState.deltaY === newState.deltaY &&
    oldState.height === newState.height &&
    oldState.minLineY === newState.minLineY &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.scrollBarHeight === newState.scrollBarHeight &&
    oldState.scrollBarActive === newState.scrollBarActive &&
    oldState.error === newState.error &&
    oldState.errorCode === newState.errorCode &&
    oldState.selectedOption === newState.selectedOption &&
    oldState.listItems === newState.listItems &&
    oldState.filteredItems === newState.filteredItems
  )
}
