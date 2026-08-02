const outputChannelProvider = {
  id: 'xyz',
  label: 'Xyz',
}

const main = async () => {
  const channel = createOutputChannel(outputChannelProvider.id)
  await activate()
  await channel.appendLine('test content a')
  await channel.append('test content b')
  registerCommand({
    id: 'xyz.sampleCommand',
    async execute() {
      await channel.append('updated content')
    },
  })
}

await main()
import { activate, createOutputChannel, registerCommand } from '@lvce-editor/api'
