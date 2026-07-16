const firstOutputChannelProvider = {
  id: 'first',
  label: 'First',
}

const secondOutputChannelProvider = {
  id: 'second',
  label: 'Second',
}

export const activate = async () => {
  const firstChannel = vscode.registerOutputChannel(firstOutputChannelProvider)
  const secondChannel = vscode.registerOutputChannel(secondOutputChannelProvider)
  await firstChannel.append('first channel content')
  await secondChannel.append('second channel content')
}
