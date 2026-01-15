import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import { registerCommands } from '../OutputStates/OutputStates.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMapRef.commandMapRef,
  })
  RendererWorker.set(rpc)
}
