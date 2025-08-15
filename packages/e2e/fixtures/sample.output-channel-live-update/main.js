const outputChannelProvider = {
  id: 'xyz',
  label: 'Xyz',
}

export const activate = () => {
  const channel = vscode.registerOutputChannel(outputChannelProvider)
  channel.append('test content')
}
