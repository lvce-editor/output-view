const outputChannel = {
  id: 'xyz',
  readFile() {
    return 'test content'
  },
}

export const activate = () => {
  vscode.registerOutputChannel(outputChannel)
}
