import * as ExtensionHostOutputChannel from '../ExtensionHostOutput/ExtensionHostOutput.ts'

const toExtensionHostOption = (outputChannel: any): any => {
  return {
    file: outputChannel.path,
    name: outputChannel.id,
  }
}

export const getOptions = async (): Promise<readonly any[]> => {
  // TODO get list of outputChannels from extension host
  const channels = await ExtensionHostOutputChannel.getOutputChannels()

  // TODO add a separate function getBuiltinOptions
  const options = [
    {
      file: '/tmp/log-main-process.txt',
      name: 'Main',
    },
    {
      file: '/tmp/log-shared-process.txt',
      name: 'Shared Process',
    },
    ...channels.map(toExtensionHostOption),
  ]
  return options
}
