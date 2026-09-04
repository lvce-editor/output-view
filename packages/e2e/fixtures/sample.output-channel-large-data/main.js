const lineCount = 10_000
const filterTarget = 'unique-filter-target'

const outputChannelProvider = {
  id: 'large-data',
  label: 'Large Data',
}

const getLine = (index) => {
  const suffix = index === lineCount - 1 ? ` ${filterTarget}` : ''
  return `line ${index.toString().padStart(5, '0')}${suffix}`
}

const main = async () => {
  const channel = createOutputChannel(outputChannelProvider.id)
  await activate()
  const output = Array.from({ length: lineCount }, (_, index) => getLine(index)).join('\n')
  await channel.appendLine(output)
}

await main()
import { activate, createOutputChannel } from '@lvce-editor/api'
