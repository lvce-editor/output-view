const outputChannelProvider = {
  id: 'xyz',
  label: 'Xyz',
}

const main = async () => {
  const channel = createOutputChannel(outputChannelProvider.id)
  await activate()
  await channel.appendLine('test content')
}

await main()
import { activate, createOutputChannel } from '@lvce-editor/api'
