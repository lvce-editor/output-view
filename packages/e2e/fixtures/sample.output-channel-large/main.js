export const activate = () => {
  const channel = vscode.registerOutputChannel({
    id: 'large-output',
    label: 'Large Output'
  })
  
  // Generate a large amount of content (approximately 1MB)
  const chunk = 'This is a line of text that will be repeated many times to create a large output file. '.repeat(100)
  
  // Add content in chunks to simulate large output
  for (let i = 0; i < 100; i++) {
    channel.append(`Chunk ${i + 1}: ${chunk}\n`)
  }
  
  // Add some specific markers for testing
  channel.append('\n=== START_MARKER ===\n')
  for (let i = 0; i < 50; i++) {
    channel.append(`Line ${i + 1}: ${'x'.repeat(200)}\n`)
  }
  channel.append('=== END_MARKER ===\n')
  
  // Add some very long lines
  channel.append('\n=== LONG_LINE_START ===\n')
  channel.append('A'.repeat(10000) + '\n')
  channel.append('B'.repeat(5000) + '\n')
  channel.append('=== LONG_LINE_END ===\n')
}
