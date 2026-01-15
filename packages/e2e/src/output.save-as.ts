import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.save-as'

export const skip = 1

<<<<<<< HEAD
// TODO add page object
export const test: Test = async ({ Command, FileSystem, Panel, Extension, Locator, expect, Dialog }) => {
=======
export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel, QuickPick }) => {
>>>>>>> origin/main
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-basic')
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)

  // act
  await Command.execute('Output.selectChannel', 'xyz')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('xyz')
  const text = Locator('.OutputContent')
  await expect(text).toHaveText('test content')

  // act
  await Dialog.mockSaveFilePicker(() => {
    console.log('mock called')
    return 'memfs://output.txt'
  })
  await Command.execute('Output.saveAs')

  // TODO add assertion for file system
  const content = await FileSystem.readFile('memfs://output.txt')
  if (content !== 'test content') {
    throw new Error(`content did not match`)
  }
}
