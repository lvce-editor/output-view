import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.extension-channel-open'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator, Output, Panel }) => {
  const extensionUri = import.meta.resolve('../fixtures/sample.extension-api-output-channel-open')
  await Extension.addWebExtension(extensionUri)

  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)
  await Output.selectChannel('sample-extension-output-open')

  await expect(Locator('[name="output"]')).toHaveValue('sample-extension-output-open')
  await expect(Locator('.OutputContent')).toHaveText('extension booted\npre-open line')
}
