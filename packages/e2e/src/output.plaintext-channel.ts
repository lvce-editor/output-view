import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.plaintext-channel'

export const test: Test = async ({ expect, Extension, Locator, Output }) => {
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-plaintext')
  await Extension.addWebExtension(extensionUri)
  await Output.show()
  await Output.selectChannel('plaintext')

  const content = Locator('.OutputContent')
  await expect(content).toHaveText('Starting Dev Containers for file:///workspace/project')
  await expect(Locator('.OutputContent a')).toHaveCount(0)
}
