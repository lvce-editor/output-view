import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.filter'

export const skip = 1

// TODO add page object
export const test: Test = async ({ Command, FileSystem, Panel, Extension, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-filter').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)

  // act
  await Command.execute('Output.selectChannel', 'xyz')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('xyz')
  const text = Locator('.OutputContent')
  await expect(text).toHaveText('test content atest content b')

  // act
  await Command.execute('Output.handleFiterInput', 'content b')
  await expect(text).toHaveText('test content b')
}
