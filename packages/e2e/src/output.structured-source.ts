import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.structured-source'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-structured')
  await Extension.addWebExtension(extensionUri)
  await Output.show()
  await Output.selectChannel('structured')

  const links = Locator('.OutputContent .OutputSourceLink')
  await expect(links).toHaveCount(2)
  const warningSource = links.first()
  await expect(warningSource).toHaveText('rendererWorkerMain.js:3455')
  await expect(warningSource).toHaveAttribute('href', 'lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js')
  await expect(warningSource).toHaveAttribute('target', '_blank')
}
