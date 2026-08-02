const firstOutputChannelProvider = {
  id: 'first',
  label: 'First',
}

const secondOutputChannelProvider = {
  id: 'second',
  label: 'Second',
}

const main = async () => {
  const firstChannel = createOutputChannel(firstOutputChannelProvider.id)
  const secondChannel = createOutputChannel(secondOutputChannelProvider.id)
  await activate()
  await firstChannel.append('first channel content')
  await secondChannel.append('second channel content')
}

await main()
import { activate, createOutputChannel } from '@lvce-editor/api'
