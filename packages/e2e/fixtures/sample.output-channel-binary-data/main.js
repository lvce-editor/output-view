export const activate = () => {
  const channel = vscode.registerOutputChannel({
    id: 'binary-data',
    label: 'Binary Data'
  })
  
  channel.append('=== BINARY/MALFORMED DATA TEST ===\n')
  
  // Test 1: Control characters
  channel.append('Control characters:\n')
  for (let i = 0; i < 32; i++) {
    channel.append(`Char ${i}: [${String.fromCharCode(i)}]\n`)
  }
  
  // Test 2: High ASCII characters
  channel.append('High ASCII:\n')
  for (let i = 128; i < 256; i++) {
    channel.append(String.fromCharCode(i))
  }
  channel.append('\n')
  
  // Test 3: Malformed UTF-8 sequences (simulated)
  channel.append('Malformed sequences:\n')
  channel.append('\xFF\xFE\xFD\xFC') // Invalid UTF-8
  channel.append('\n')
  
  // Test 4: Binary-like data
  channel.append('Binary-like data:\n')
  const binaryData = []
  for (let i = 0; i < 256; i++) {
    binaryData.push(String.fromCharCode(i))
  }
  channel.append(binaryData.join('') + '\n')
  
  // Test 5: Mixed valid and invalid data
  channel.append('Mixed data:\n')
  channel.append('Valid text')
  channel.append('\x00\x01\x02\x03') // Null and control chars
  channel.append('More valid text\n')
  
  // Test 6: Very long sequences of control characters
  channel.append('Long control sequence:\n')
  channel.append('\x07'.repeat(100)) // 100 bell characters
  channel.append('\n')
  
  // Test 7: Zero-width characters
  channel.append('Zero-width:\n')
  channel.append('Before\u200BAfter\u200CMore\u200DText\n') // Zero-width joiner, etc.
  
  // Test 8: RTL override and other directional markers
  channel.append('Directional:\n')
  channel.append('Normal\u202ETRL\u202FLTR\n') // RTL override
  
  // Test 9: Various Unicode spaces
  channel.append('Spaces:\n')
  channel.append('Normal\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205FSpace\n')
  
  // Test 10: Surrogate pairs (simulated)
  channel.append('Surrogate pairs:\n')
  channel.append('\uD83D\uDE00\uD83D\uDE01\uD83D\uDE02\n') // Emoji
  
  channel.append('=== BINARY DATA TEST COMPLETE ===\n')
}
