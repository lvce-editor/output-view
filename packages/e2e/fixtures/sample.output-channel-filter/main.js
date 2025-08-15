const outputChannelProvider = {
  id: 'xyz',
  label: 'Xyz',
}

export const activate = async () => {
  const channel = vscode.registerOutputChannel(outputChannelProvider)
  await channel.append('test content a')
  await channel.append('test content b')
  vscode.registerCommand({
    id: 'xyz.sampleCommand',
    async execute() {
      await channel.append('updated content')
    },
  })
}
