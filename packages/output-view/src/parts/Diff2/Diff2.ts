import * as Diff from '../Diff/Diff.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'
import { updateVirtualList } from '../UpdateVirtualList/UpdateVirtualList.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { newState, oldState } = OutputStates.get(uid)
  const reset = oldState.selectedOption !== newState.selectedOption || oldState.filterValue !== newState.filterValue
  const updatedState = updateVirtualList(reset ? { ...newState, deltaY: 0, followOutput: true } : newState)
  OutputStates.set(uid, oldState, updatedState)
  const diffResult = Diff.diff(oldState, updatedState)
  return diffResult
}
