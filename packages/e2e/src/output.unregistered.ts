import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.unregistered'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-unregistered').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act & assert
  // The extension declares an output provider in JSON but doesn't register it
  // The channel should not appear in the dropdown
  const select = Locator('[name="output"]')
  await expect(select).not.toContainText('Unregistered Channel')
}
