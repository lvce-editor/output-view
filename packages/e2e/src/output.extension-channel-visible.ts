import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.extension-channel-visible'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator, Panel }) => {
  const extensionUri = import.meta.resolve('../fixtures/sample.extension-api-output-channel-visible')
  await Extension.addWebExtension(extensionUri)

  await Panel.open('Output')
  await Command.execute('Panel.selectIndex', 1)

  const outputOption = Locator('[name="output"] option[value="sample-extension-output-visible"]')
  await expect(outputOption).toHaveText('Extension Output Visible')
}
