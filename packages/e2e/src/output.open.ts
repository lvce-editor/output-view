import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.open'

export const skip = 1

// TODO add page object
export const test: Test = async ({ Command, FileSystem, Panel, Extension, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-basic').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)

  // act
  await Command.execute('Output.selectChannel', 'xyz')

  // assert
  const text = Locator('.Output .Message')
  await expect(text).toHaveText('abc')
}
