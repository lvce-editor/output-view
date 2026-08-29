export const activate = () => {
  const channel = vscode.registerOutputChannel({
    id: 'many-small',
    label: 'Many Small'
  })
  
  // Add many small pieces of data to test performance and handling
  for (let i = 0; i < 1000; i++) {
    channel.append(`Line ${i + 1}: Small piece of data\n`)
  }
  
  // Add some specific markers for testing
  channel.append('=== MARKER_START ===\n')
  for (let i = 0; i < 100; i++) {
    channel.append(`Marker line ${i}: ${i.toString().padStart(3, '0')}\n`)
  }
  channel.append('=== MARKER_END ===\n')
  
  // Add single character lines
  channel.append('=== SINGLE_CHARS ===\n')
  for (let i = 0; i < 26; i++) {
    channel.append(String.fromCharCode(65 + i) + '\n')
  }
  channel.append('=== SINGLE_CHARS_END ===\n')
  
  // Add empty lines
  channel.append('=== EMPTY_LINES ===\n')
  for (let i = 0; i < 10; i++) {
    channel.append('\n')
  }
  channel.append('=== EMPTY_LINES_END ===\n')
}
