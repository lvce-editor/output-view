export const activate = () => {
  // Test empty channel
  const emptyChannel = vscode.registerOutputChannel({
    id: 'empty-channel',
    label: 'Empty Channel'
  })
  // Don't append anything
  
  // Test whitespace-only channel
  const whitespaceChannel = vscode.registerOutputChannel({
    id: 'whitespace-only',
    label: 'Whitespace Only'
  })
  whitespaceChannel.append('   \n\t\n  \n')
  
  // Test numeric content
  const numericChannel = vscode.registerOutputChannel({
    id: 'numeric-content',
    label: 'Numeric Content'
  })
  numericChannel.append('1234567890\n987654321\n0.123456\n')
  
  // Test JSON content
  const jsonChannel = vscode.registerOutputChannel({
    id: 'json-content',
    label: 'JSON Content'
  })
  jsonChannel.append('{"key":"value","number":123,"array":[1,2,3]}\n')
  
  // Test URL content
  const urlChannel = vscode.registerOutputChannel({
    id: 'url-content',
    label: 'URL Content'
  })
  urlChannel.append('https://example.com/path?query=value&another=123\n')
  urlChannel.append('http://localhost:3000/api/endpoint\n')
  urlChannel.append('ftp://files.example.com/data.txt\n')
}
