import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.structured-timestamp'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-structured')
  await Extension.addWebExtension(extensionUri)
  await Output.show()
  await Output.selectChannel('structured')

  const content = Locator('.OutputContent')
  await expect(content).not.toContainText('2026-07-29T06:37:29.644Z')
  await expect(content).not.toContainText('[Window]')
  await expect(content).not.toContainText('[warning]')
}
