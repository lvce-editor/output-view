import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.long-lines'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-long-lines').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'long-lines')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('long-lines')
  const text = Locator('.OutputContent')
  
  // Verify that long lines content is loaded
  await expect(text).toContainText('VERY LONG LINES TEST')
  await expect(text).toContainText('Line 1 (50K chars):')
  await expect(text).toContainText('Line 2 (50K chars with marker):')
  await expect(text).toContainText('MIDDLE_MARKER')
  await expect(text).toContainText('SPACED_MARKER')
  
  // Test filtering on markers within long lines
  await Command.execute('Output.handleFilterInput', 'MIDDLE_MARKER', /* Script */ 2)
  await expect(text).toContainText('MIDDLE_MARKER')
  
  // Test filtering on spaced marker
  await Command.execute('Output.handleFilterInput', 'SPACED_MARKER', /* Script */ 2)
  await expect(text).toContainText('SPACED_MARKER')
  
  // Test filtering on repeated content
  await Command.execute('Output.handleFilterInput', '0123456789', /* Script */ 2)
  await expect(text).toContainText('Line 3 (50K digits):')
  
  // Test filtering on emojis
  await Command.execute('Output.handleFilterInput', '🚀', /* Script */ 2)
  await expect(text).toContainText('Line 4 (40K emojis):')
  
  // Test filtering on special characters
  await Command.execute('Output.handleFilterInput', '!@#$%^&*()', /* Script */ 2)
  await expect(text).toContainText('Line 8 (special):')
  
  // Clear filter and test JSON-like content
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  await Command.execute('Output.handleFilterInput', '"key":', /* Script */ 2)
  await expect(text).toContainText('Line 9 (JSON-like):')
  
  // Test URL-like content
  await Command.execute('Output.handleFilterInput', 'https://example.com', /* Script */ 2)
  await expect(text).toContainText('Line 10 (URL-like):')
  
  // Test that the content doesn't cause performance issues
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  await expect(text).toContainText('END LONG LINES')
}
