export const activate = () => {
  // Register multiple channels with the same label but different IDs
  const channel1 = vscode.registerOutputChannel({
    id: 'duplicate-1',
    label: 'Duplicate Name'
  })
  
  const channel2 = vscode.registerOutputChannel({
    id: 'duplicate-2', 
    label: 'Duplicate Name'
  })
  
  const channel3 = vscode.registerOutputChannel({
    id: 'duplicate-3',
    label: 'Duplicate Name'
  })
  
  // Also register some with same ID but different labels (should handle conflicts)
  try {
    const channel4 = vscode.registerOutputChannel({
      id: 'duplicate-1', // Same ID as channel1
      label: 'Different Label'
    })
    channel4.append('This should not appear due to ID conflict')
  } catch (e) {
    console.log('Expected error for duplicate ID:', e.message)
  }
  
  // Add content to each channel
  channel1.append('Content from channel 1 (duplicate-1)')
  channel2.append('Content from channel 2 (duplicate-2)')
  channel3.append('Content from channel 3 (duplicate-3)')
  
  // Register a unique channel for comparison
  const uniqueChannel = vscode.registerOutputChannel({
    id: 'unique-channel',
    label: 'Unique Channel'
  })
  uniqueChannel.append('This is a unique channel')
}
