import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.open-channel'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-multiple')
  await Extension.addWebExtension(extensionUri)
  const content = Locator('.OutputContent')
  const select = Locator('[name="output"]')

  // act
  await Command.execute('Layout.showPanel', 'Output', 'second')

  // assert
  await expect(content).toHaveText('second channel content')
  await expect(select).toHaveValue('second')
}
