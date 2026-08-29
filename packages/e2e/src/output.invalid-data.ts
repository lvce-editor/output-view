import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.invalid-data'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-invalid-data').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'valid-after-invalid')

  // assert
  // The valid channel should be available and work correctly
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('valid-after-invalid')
  const text = Locator('.OutputContent')
  await expect(text).toHaveText('This channel should work after invalid attempts')
  
  // Verify that invalid channels were not created
  await expect(select).not.toContainText('Missing ID')
  await expect(select).not.toContainText('Missing Label')
  await expect(select).not.toContainText('Empty ID')
  await expect(select).not.toContainText('Empty Label')
  await expect(select).not.toContainText('Non-string ID')
  await expect(select).not.toContainText('Non-string Label')
}
