import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.open'

export const skip = 1

// TODO add page object
export const test: Test = async ({ FileSystem, Panel, Extension }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-basic').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
}
