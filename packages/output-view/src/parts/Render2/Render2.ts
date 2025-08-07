import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as ProblemStates from '../OutputStates/OutputStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly ViewletCommand[] => {
  const { oldState, newState } = ProblemStates.get(uid)
  ProblemStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
