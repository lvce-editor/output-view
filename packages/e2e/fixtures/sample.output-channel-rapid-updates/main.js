export const activate = () => {
  const channel = vscode.registerOutputChannel({
    id: 'rapid-updates',
    label: 'Rapid Updates'
  })
  
  channel.append('=== RAPID UPDATES TEST ===\n')
  
  // Test 1: Rapid small updates
  for (let i = 0; i < 100; i++) {
    channel.append(`Rapid update ${i + 1}\n`)
  }
  
  // Test 2: Rapid large chunks
  for (let i = 0; i < 10; i++) {
    const chunk = 'Large chunk '.repeat(1000) + i + '\n'
    channel.append(chunk)
  }
  
  // Test 3: Mixed rapid updates with markers
  channel.append('=== START_MIXED ===\n')
  for (let i = 0; i < 50; i++) {
    if (i % 10 === 0) {
      channel.append(`MARKER_${i}\n`)
    }
    channel.append(`Line ${i}: ${'x'.repeat(i % 20 + 1)}\n`)
  }
  channel.append('=== END_MIXED ===\n')
  
  // Test 4: Very rapid single character updates
  channel.append('=== SINGLE_CHARS ===\n')
  for (let i = 0; i < 1000; i++) {
    channel.append(String.fromCharCode(65 + (i % 26)))
  }
  channel.append('\n=== SINGLE_CHARS_END ===\n')
  
  // Test 5: Rapid updates with special characters
  channel.append('=== SPECIAL_RAPID ===\n')
  for (let i = 0; i < 100; i++) {
    channel.append(`Special ${i}: 🚀 ${'!@#$%^&*()'.repeat(i % 5 + 1)}\n`)
  }
  channel.append('=== SPECIAL_RAPID_END ===\n')
  
  // Test 6: Rapid clear and append cycles
  for (let cycle = 0; cycle < 5; cycle++) {
    channel.append(`CYCLE_${cycle}_START\n`)
    for (let i = 0; i < 20; i++) {
      channel.append(`  Item ${cycle}-${i}\n`)
    }
    channel.append(`CYCLE_${cycle}_END\n`)
  }
  
  channel.append('=== RAPID UPDATES COMPLETE ===\n')
}
