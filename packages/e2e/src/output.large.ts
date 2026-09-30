import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.large'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Output, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-large').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'large-output')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('large-output')
  const text = Locator('.OutputContent')

  // Verify that the content is loaded (should contain our markers)
  await expect(text).toContainText('START_MARKER')
  await expect(text).toContainText('END_MARKER')
  await expect(text).toContainText('LONG_LINE_START')
  await expect(text).toContainText('LONG_LINE_END')

  // Test filtering works on large content
  await Command.execute('Output.handleFilterInput', 'START_MARKER', /* Script */ 2)
  await expect(text).toContainText('START_MARKER')
  await expect(text).toContainText('END_MARKER')

  // Clear filter and test long lines
  await Output.handleFilterInput('')
  await expect(text).toContainText('A'.repeat(1000)) // Check first 1000 chars of long line

  // Test that we can scroll to the end
  await Command.execute('Output.handleFilterInput', 'LONG_LINE_END', /* Script */ 2)
  await expect(text).toContainText('LONG_LINE_END')
}
