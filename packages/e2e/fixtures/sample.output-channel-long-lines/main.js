export const activate = () => {
  const channel = vscode.registerOutputChannel({
    id: 'long-lines',
    label: 'Long Lines'
  })
  
  channel.append('=== VERY LONG LINES TEST ===\n')
  
  // Create extremely long lines with different content
  const longString1 = 'A'.repeat(50000)
  const longString2 = 'B'.repeat(25000) + 'MIDDLE_MARKER' + 'C'.repeat(25000)
  const longString3 = '0123456789'.repeat(5000)
  const longString4 = '🚀'.repeat(10000)
  const longString5 = ' '.repeat(1000) + 'SPACED_MARKER' + ' '.repeat(1000)
  
  channel.append('Line 1 (50K chars): ' + longString1 + '\n')
  channel.append('Line 2 (50K chars with marker): ' + longString2 + '\n')
  channel.append('Line 3 (50K digits): ' + longString3 + '\n')
  channel.append('Line 4 (40K emojis): ' + longString4 + '\n')
  channel.append('Line 5 (2K spaces with marker): ' + longString5 + '\n')
  
  // Line with no spaces at all
  channel.append('Line 6 (no spaces): ' + 'X'.repeat(10000) + '\n')
  
  // Line with mixed content
  const mixedContent = []
  for (let i = 0; i < 1000; i++) {
    mixedContent.push(`chunk${i}:`)
  }
  channel.append('Line 7 (mixed): ' + mixedContent.join('') + '\n')
  
  // Line with special characters repeated
  channel.append('Line 8 (special): ' + '!@#$%^&*()_+-=[]{}|;:,.<>?/'.repeat(1000) + '\n')
  
  // Line with JSON-like content
  const jsonLike = '{"key":"' + 'value'.repeat(1000) + '","number":' + '1234567890'.repeat(100) + '}'
  channel.append('Line 9 (JSON-like): ' + jsonLike + '\n')
  
  // Line with URL-like content
  const urlLike = 'https://example.com/very/long/path/' + 'segment'.repeat(500) + '/end'
  channel.append('Line 10 (URL-like): ' + urlLike + '\n')
  
  channel.append('=== END LONG LINES ===\n')
}
