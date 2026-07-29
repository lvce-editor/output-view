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

export const activate = async () => {
  const channel = vscode.registerOutputChannel(outputChannelProvider)
  const output = Array.from({ length: lineCount }, (_, index) => getLine(index)).join('\n')
  await channel.append(output)
}
