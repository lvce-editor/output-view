import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.clear'

// TODO add page object
export const test: Test = async ({ Output, FileSystem, Panel, Extension, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-basic').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')
  await Output.show()

  // act
  await Output.selectChannel('xyz')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('xyz')
  const text = Locator('.OutputContent')
  await expect(text).toHaveText('test content')

  // act
  await Output.clear()

  // assert
  await expect(text).toHaveText('')
}
