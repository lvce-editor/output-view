import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.filter'

// TODO add page object
export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Output, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-filter')
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)

  // act
  await Output.selectChannel('xyz')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('xyz')
  const text = Locator('.OutputContent')
  await expect(text).toHaveText('test content atest content b')

  // act
  await Command.execute('Output.handleFilterInput', 'content b', /* Script */ 2)
  await expect(text).toHaveText('test content b')
}
