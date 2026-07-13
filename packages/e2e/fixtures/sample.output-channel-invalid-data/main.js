export const activate = () => {
  // Test various invalid data scenarios
  
  // Test 1: null output channel provider
  try {
    vscode.registerOutputChannel(null)
  } catch (e) {
    console.log('Expected error for null provider:', e.message)
  }
  
  // Test 2: undefined output channel provider
  try {
    vscode.registerOutputChannel(undefined)
  } catch (e) {
    console.log('Expected error for undefined provider:', e.message)
  }
  
  // Test 3: provider with missing id
  try {
    vscode.registerOutputChannel({
      label: 'Missing ID'
    })
  } catch (e) {
    console.log('Expected error for missing id:', e.message)
  }
  
  // Test 4: provider with missing label
  try {
    vscode.registerOutputChannel({
      id: 'missing-label'
    })
  } catch (e) {
    console.log('Expected error for missing label:', e.message)
  }
  
  // Test 5: provider with empty id
  try {
    vscode.registerOutputChannel({
      id: '',
      label: 'Empty ID'
    })
  } catch (e) {
    console.log('Expected error for empty id:', e.message)
  }
  
  // Test 6: provider with empty label
  try {
    vscode.registerOutputChannel({
      id: 'empty-label',
      label: ''
    })
  } catch (e) {
    console.log('Expected error for empty label:', e.message)
  }
  
  // Test 7: provider with non-string id
  try {
    vscode.registerOutputChannel({
      id: 123,
      label: 'Non-string ID'
    })
  } catch (e) {
    console.log('Expected error for non-string id:', e.message)
  }
  
  // Test 8: provider with non-string label
  try {
    vscode.registerOutputChannel({
      id: 'non-string-label',
      label: { toString: () => 'object label' }
    })
  } catch (e) {
    console.log('Expected error for non-string label:', e.message)
  }
  
  // Test 9: Register a valid channel after invalid attempts
  const validChannel = vscode.registerOutputChannel({
    id: 'valid-after-invalid',
    label: 'Valid After Invalid'
  })
  validChannel.append('This channel should work after invalid attempts')
}
