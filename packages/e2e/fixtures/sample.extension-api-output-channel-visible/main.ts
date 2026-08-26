import { activate, createOutputChannel } from '@lvce-editor/api'

createOutputChannel('sample-extension-output-visible')

const main = async (): Promise<void> => {
  await activate()
}

main()
