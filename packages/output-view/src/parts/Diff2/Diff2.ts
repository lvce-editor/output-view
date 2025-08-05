import * as Diff from '../Diff/Diff.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = OutputStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return diffResult
}
