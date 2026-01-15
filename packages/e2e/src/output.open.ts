import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.open'

// export const skip = 1

<<<<<<< HEAD
// TODO add page object
export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Output, Panel }) => {
=======
export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
>>>>>>> origin/main
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-basic')
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)

  // act
  await Output.selectChannel('xyz')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('xyz')
  const text = Locator('.OutputContent')
  await expect(text).toHaveText('test content')
}
