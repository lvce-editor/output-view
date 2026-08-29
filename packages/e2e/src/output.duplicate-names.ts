import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.duplicate-names'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-duplicate-names').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // assert - check that channels are available
  const select = Locator('[name="output"]')
  const text = Locator('.OutputContent')
  
  // Test that duplicate names are handled (should show all with some differentiation)
  await expect(select).toContainText('Duplicate Name')
  await expect(select).toContainText('Unique Channel')
  
  // The system should differentiate between duplicate names somehow
  // This test verifies that the channels are accessible
  
  // Try to select the first duplicate channel
  await Command.execute('Output.selectChannel', 'duplicate-1')
  await expect(text).toHaveText('Content from channel 1 (duplicate-1)')
  
  // Try to select the second duplicate channel
  await Command.execute('Output.selectChannel', 'duplicate-2')
  await expect(text).toHaveText('Content from channel 2 (duplicate-2)')
  
  // Try to select the third duplicate channel
  await Command.execute('Output.selectChannel', 'duplicate-3')
  await expect(text).toHaveText('Content from channel 3 (duplicate-3)')
  
  // Try to select the unique channel
  await Command.execute('Output.selectChannel', 'unique-channel')
  await expect(text).toHaveText('This is a unique channel')
  
  // Verify that the duplicate ID channel was not created
  await expect(select).not.toContainText('Different Label')
}
