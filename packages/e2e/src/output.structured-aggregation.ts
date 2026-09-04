import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.structured-aggregation'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-structured')
  await Extension.addWebExtension(extensionUri)
  await Output.show()
  await Output.selectChannel('structured')

  const repeatedLine = Locator('.OutputContent .Line.info').first()
  await expect(repeatedLine).toHaveText('4 cannot execute viewlet command StatusBar.handleItemsChanged: no active instance for StatusBar')
  const count = Locator('.OutputContent .Line.info .OutputRepeatCount')
  await expect(count).toHaveCount(1)
  await expect(count).toHaveText('4')
}
