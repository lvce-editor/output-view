const outputChannelProvider = {
  id: 'xyz',
}

export const activate = () => {
  const channel = vscode.registerOutputChannel(outputChannelProvider)
  channel.append('test content')
}
