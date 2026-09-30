import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.binary-data'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-binary-data').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'binary-data')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('binary-data')
  const text = Locator('.OutputContent')
  
  // Verify that the channel loads without crashing
  await expect(text).toContainText('BINARY/MALFORMED DATA TEST')
  await expect(text).toContainText('Control characters:')
  await expect(text).toContainText('High ASCII:')
  await expect(text).toContainText('Malformed sequences:')
  await expect(text).toContainText('Binary-like data:')
  await expect(text).toContainText('Mixed data:')
  await expect(text).toContainText('Binary DATA TEST COMPLETE')
  
  // Test filtering on valid text within binary data
  await Command.execute('Output.handleFilterInput', 'Valid text', /* Script */ 2)
  await expect(text).toContainText('Valid text')
  
  // Test filtering on specific sections
  await Command.execute('Output.handleFilterInput', 'Control characters:', /* Script */ 2)
  await expect(text).toContainText('Control characters:')
  
  // Test filtering on directional markers
  await Command.execute('Output.handleFilterInput', 'Directional:', /* Script */ 2)
  await expect(text).toContainText('Directional:')
  
  // Test filtering on spaces section
  await Command.execute('Output.handleFilterInput', 'Spaces:', /* Script */ 2)
  await expect(text).toContainText('Spaces:')
  
  // Clear filter and verify final state
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  await expect(text).toContainText('BINARY DATA TEST COMPLETE')
  
  // Verify that the content is displayed (even if some characters might not render perfectly)
  // The important thing is that the channel doesn't crash and shows the text portions
  await expect(text).toContainText('Before') // Should show the "Before" part from zero-width test
  await expect(text).toContainText('After') // Should show the "After" part
  await expect(text).toContainText('Normal') // Should show from directional test
}
