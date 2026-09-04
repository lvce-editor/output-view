import { activate, createOutputChannel } from '@lvce-editor/api'

const output = createOutputChannel('sample-extension-output-open')

const main = async (): Promise<void> => {
  await activate()
  await output.appendLine('extension booted')
  await output.append('pre-open line')
}

main()
