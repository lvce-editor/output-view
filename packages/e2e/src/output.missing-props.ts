import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.missing-props'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-missing-props').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // assert - verify that only valid channels were created
  const select = Locator('[name="output"]')
  const text = Locator('.OutputContent')
  
  // Verify that invalid channels were not created
  await expect(select).not.toContainText('Missing ID')
  await expect(select).not.toContainText('Missing Label')
  await expect(select).not.toContainText('Null ID')
  await expect(select).not.toContainText('Null Label')
  await expect(select).not.toContainText('Undefined ID')
  await expect(select).not.toContainText('Undefined Label')
  
  // Verify that valid channels were created
  await expect(select).toContainText('Valid With Extras')
  await expect(select).toContainText('Minimal Valid')
  
  // Test the valid channel with extra properties
  await Command.execute('Output.selectChannel', 'valid-with-extras')
  await expect(text).toHaveText('This channel should work despite extra properties')
  
  // Test the minimal valid channel
  await Command.execute('Output.selectChannel', 'minimal-valid')
  await expect(text).toHaveText('This is a minimal valid channel')
}
