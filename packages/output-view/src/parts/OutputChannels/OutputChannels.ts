import * as ExtensionHostOutputChannel from '../ExtensionHostOutput/ExtensionHostOutput.ts'

const toExtensionHostOption = (outputChannel: any): any => {
  return {
    name: outputChannel.id,
    file: outputChannel.path,
  }
}

export const getOptions = async (): Promise<readonly any[]> => {
  // TODO get list of outputChannels from extension host
  const channels = await ExtensionHostOutputChannel.getOutputChannels()

  // TODO add a separate function getBuiltinOptions
  const options = [
    {
      name: 'Main',
      file: '/tmp/log-main-process.txt',
    },
    {
      name: 'Shared Process',
      file: '/tmp/log-shared-process.txt',
    },
    ...channels.map(toExtensionHostOption),
  ]
  return options
}
