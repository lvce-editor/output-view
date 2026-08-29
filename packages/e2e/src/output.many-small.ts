import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.many-small'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-many-small').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'many-small')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('many-small')
  const text = Locator('.OutputContent')
  
  // Verify that all content is present
  await expect(text).toContainText('Line 1: Small piece of data')
  await expect(text).toContainText('Line 1000: Small piece of data')
  await expect(text).toContainText('MARKER_START')
  await expect(text).toContainText('MARKER_END')
  await expect(text).toContainText('SINGLE_CHARS')
  await expect(text).toContainText('EMPTY_LINES')
  
  // Test filtering on specific content
  await Command.execute('Output.handleFilterInput', 'Marker line 042', /* Script */ 2)
  await expect(text).toContainText('Marker line 042: 042')
  
  // Test filtering for single characters
  await Command.execute('Output.handleFilterInput', 'Z', /* Script */ 2)
  await expect(text).toContainText('Z')
  
  // Clear filter
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  
  // Test that we can find specific lines in the large output
  await Command.execute('Output.handleFilterInput', 'Line 500', /* Script */ 2)
  await expect(text).toContainText('Line 500: Small piece of data')
  
  // Test that empty lines are handled properly
  await Command.execute('Output.handleFilterInput', 'EMPTY_LINES', /* Script */ 2)
  await expect(text).toContainText('EMPTY_LINES')
  await expect(text).toContainText('EMPTY_LINES_END')
}
