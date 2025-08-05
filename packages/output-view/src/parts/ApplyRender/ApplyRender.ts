import type { OutputState } from '../OutputState/OutputState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: OutputState, newState: OutputState, diffResult: readonly number[]): readonly ViewletCommand[] => {
  const commands: ViewletCommand[] = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    commands.push(fn(oldState, newState))
  }
  return commands
}
