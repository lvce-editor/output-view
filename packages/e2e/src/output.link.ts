import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.link'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Output, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-link')
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)

  // act
  await Output.selectChannel('xyz')

  // assert
  const link = Locator('.OutputContent a') // TODO use link classname
  await expect(link).toBeVisible()
  await expect(link).toHaveText('https://example.com')
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(link).toHaveAttribute('href', 'https://example.com')
}
