import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.structured-error'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-structured')
  await Extension.addWebExtension(extensionUri)
  await Output.show()
  await Output.selectChannel('structured')

  const error = Locator('.OutputContent .Line.error')
  await expect(error).toHaveCount(1)
  await expect(error).toHaveText('request failed rendererWorkerMain.js:77')
}
