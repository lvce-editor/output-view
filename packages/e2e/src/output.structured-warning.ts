import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.structured-warning'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-structured')
  await Extension.addWebExtension(extensionUri)
  await Output.show()
  await Output.selectChannel('structured')

  const warning = Locator('.OutputContent .Line.warning')
  await expect(warning).toHaveCount(1)
  await expect(warning).toHaveText('deprecated API rendererWorkerMain.js:3455')
}
