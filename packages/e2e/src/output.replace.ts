import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.replace'

export const skip = 1

// TODO add page object
export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel, QuickPick }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-replace').toString()
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
  await QuickPick.open()
  await QuickPick.setValue('>Sample Command')
  await QuickPick.selectItem('Sample Command')

  // assert
  await expect(text).toHaveText('updated content')
}
