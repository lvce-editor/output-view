import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.structured-source'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Output, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  const fileUri = `${tmpDir}/test.txt`
  const plainFileUri = `${tmpDir}/plain.txt`
  await FileSystem.setFiles([
    { content: 'first\nsecond\nthird', uri: fileUri },
    { content: 'plain file content', uri: plainFileUri },
  ])
  await Workspace.setPath(tmpDir)
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-structured')
  await Extension.addWebExtension(extensionUri)
  await Output.show()
  await Output.selectChannel('structured')

  const links = Locator('.OutputContent .OutputSourceLink')
  await expect(links).toHaveCount(5)
  const warningSource = links.first()
  await expect(warningSource).toHaveText('rendererWorkerMain.js:3455')
  await expect(warningSource).toHaveAttribute('href', 'lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js')
  await expect(warningSource).toHaveAttribute('data-line', '3455')
  await expect(warningSource).toHaveAttribute('target', '_blank')
  const stackSource = links.nth(2)
  await expect(stackSource).toHaveText('lvce://-/packages/renderer-process/dist/rendererProcessMain.js:8726:11')
  await expect(stackSource).toHaveAttribute('href', 'lvce://-/packages/renderer-process/dist/rendererProcessMain.js')
  await expect(stackSource).toHaveAttribute('data-line', '8726')
  await expect(stackSource).toHaveAttribute('data-column', '11')
  const fileLinks = Locator('.OutputContent .OutputSourceLink[href^="file://"]')
  await expect(fileLinks).toHaveCount(2)
  const fileStackLink = fileLinks.nth(1)
  const editor = Locator('.Editor')
  await expect(fileStackLink).toHaveAttribute('href', fileUri)
  await expect(fileStackLink).toHaveAttribute('data-line', '3')
  await expect(fileStackLink).toHaveAttribute('data-column', '1')
  // @ts-expect-error The locator accepts event initialization objects at runtime.
  await fileStackLink.dispatchEvent('click', { bubbles: true })
  await expect(editor).toBeVisible()
  await Editor.shouldHaveSelections(new Uint32Array([2, 0, 2, 0]))
  const fileLink = fileLinks.first()
  await expect(fileLink).toHaveAttribute('href', plainFileUri)
  // @ts-expect-error The locator accepts event initialization objects at runtime.
  await fileLink.dispatchEvent('click', { bubbles: true })
  await expect(editor).toBeVisible()
}
