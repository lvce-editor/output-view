import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as ProblemStates from '../OutputStates/OutputStates.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

const renderDirect = async (uid: number, commands: readonly ViewletCommand[]): Promise<readonly ViewletCommand[]> => {
  const rendererWorkerCommands = commands.filter((command) => command[0] === 'Viewlet.setFocusContext')
  const rendererProcessCommands = commands.filter((command) => command[0] !== 'Viewlet.setFocusContext')
  const transactionId = await RendererProcess.invoke('Viewlet.queueCommands', uid, rendererProcessCommands)
  return [...rendererWorkerCommands, ['Viewlet.commitPending', uid, transactionId]]
}

export const render2 = (uid: number, diffResult: readonly number[]): readonly ViewletCommand[] | Promise<readonly ViewletCommand[]> => {
  const { newState, oldState } = ProblemStates.get(uid)
  ProblemStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  if (!RendererProcess.isConnected()) {
    return commands
  }
  return renderDirect(uid, commands)
}
