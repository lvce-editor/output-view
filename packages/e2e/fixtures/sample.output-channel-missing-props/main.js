export const activate = () => {
  // Test various missing property scenarios
  
  // Test 1: Empty object
  try {
    vscode.registerOutputChannel({})
  } catch (e) {
    console.log('Expected error for empty object:', e.message)
  }
  
  // Test 2: Missing id
  try {
    vscode.registerOutputChannel({
      label: 'Missing ID'
    })
  } catch (e) {
    console.log('Expected error for missing id:', e.message)
  }
  
  // Test 3: Missing label
  try {
    vscode.registerOutputChannel({
      id: 'missing-label'
    })
  } catch (e) {
    console.log('Expected error for missing label:', e.message)
  }
  
  // Test 4: Null id
  try {
    vscode.registerOutputChannel({
      id: null,
      label: 'Null ID'
    })
  } catch (e) {
    console.log('Expected error for null id:', e.message)
  }
  
  // Test 5: Null label
  try {
    vscode.registerOutputChannel({
      id: 'null-label',
      label: null
    })
  } catch (e) {
    console.log('Expected error for null label:', e.message)
  }
  
  // Test 6: Undefined id
  try {
    vscode.registerOutputChannel({
      id: undefined,
      label: 'Undefined ID'
    })
  } catch (e) {
    console.log('Expected error for undefined id:', e.message)
  }
  
  // Test 7: Undefined label
  try {
    vscode.registerOutputChannel({
      id: 'undefined-label',
      label: undefined
    })
  } catch (e) {
    console.log('Expected error for undefined label:', e.message)
  }
  
  // Test 8: Extra properties (should be ignored)
  const validWithExtras = vscode.registerOutputChannel({
    id: 'valid-with-extras',
    label: 'Valid With Extras',
    extraProperty: 'should be ignored',
    anotherExtra: 123,
    nested: {
      prop: 'value'
    }
  })
  validWithExtras.append('This channel should work despite extra properties')
  
  // Test 9: Valid minimal channel
  const minimalValid = vscode.registerOutputChannel({
    id: 'minimal-valid',
    label: 'Minimal Valid'
  })
  minimalValid.append('This is a minimal valid channel')
}
