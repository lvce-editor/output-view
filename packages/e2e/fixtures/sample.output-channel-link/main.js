const outputChannelProvider = {
  id: 'xyz',
  label: 'Xyz',
}

const main = async () => {
  const channel = createOutputChannel(outputChannelProvider.id)
  await activate()
  await channel.append('test https://example.com link')
}

await main()
import { activate, createOutputChannel } from '@lvce-editor/api'
