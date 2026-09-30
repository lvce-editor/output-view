import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.edge-cases'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-edge-cases').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act & assert - Test various edge cases
  const select = Locator('[name="output"]')
  const text = Locator('.OutputContent')
  
  // Test empty channel
  await Command.execute('Output.selectChannel', 'empty-channel')
  await expect(text).toHaveText('')
  
  // Test whitespace-only channel
  await Command.execute('Output.selectChannel', 'whitespace-only')
  await expect(text).toHaveText('   \n\t\n  \n')
  
  // Test numeric content
  await Command.execute('Output.selectChannel', 'numeric-content')
  await expect(text).toContainText('1234567890')
  
  // Test JSON content
  await Command.execute('Output.selectChannel', 'json-content')
  await expect(text).toContainText('{"key":"value"}')
  
  // Test URL content
  await Command.execute('Output.selectChannel', 'url-content')
  await expect(text).toContainText('https://example.com')
  
  // Test that filtering works on all edge cases
  await Command.execute('Output.handleFilterInput', '123', /* Script */ 2)
  await expect(text).toContainText('1234567890')
  
  await Command.execute('Output.handleFilterInput', 'key', /* Script */ 2)
  await expect(text).toContainText('{"key":"value"}')
  
  await Command.execute('Output.handleFilterInput', 'example', /* Script */ 2)
  await expect(text).toContainText('https://example.com')
}
