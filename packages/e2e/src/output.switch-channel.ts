import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.switch-channel'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-multiple')
  await Extension.addWebExtension(extensionUri)
  await Output.show()

  const select = Locator('[name="output"]')
  const content = Locator('.OutputContent')

  // act
  await Output.selectChannel('first')

  // assert
  await expect(select).toHaveValue('first')
  await expect(content).toHaveText('first channel content')

  // act
  await Output.selectChannel('second')

  // assert
  await expect(select).toHaveValue('second')
  await expect(content).toHaveText('second channel content')

  // act
  await Output.selectChannel('first')

  // assert
  await expect(select).toHaveValue('first')
  await expect(content).toHaveText('first channel content')
}
