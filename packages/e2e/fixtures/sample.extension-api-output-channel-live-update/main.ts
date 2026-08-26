import { activate, createOutputChannel, registerCommand } from '@lvce-editor/api'

const output = createOutputChannel('sample-extension-output-live')

const main = async (): Promise<void> => {
  await activate()
  await output.append('live before')

  registerCommand({
    id: 'sample.extensionOutput.write',
    async execute() {
      await output.appendLine('')
      await output.append('live after')
    },
  })
}

main()
