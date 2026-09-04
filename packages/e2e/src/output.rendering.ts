import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.rendering'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-basic')
  await Extension.addWebExtension(extensionUri)
  await Output.show()

  // act
  await Output.selectChannel('xyz')

  // assert
  const output = Locator('.Output')
  await expect(output).toBeVisible()

  const content = Locator('.OutputContent')
  await expect(content).toBeVisible()

  const lines = Locator('.OutputContent .Line')
  await expect(lines).toHaveCount(2)
  const firstLine = lines.first()
  await expect(firstLine).toHaveText('test content')
}
