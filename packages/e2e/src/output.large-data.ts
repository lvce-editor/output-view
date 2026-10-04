import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.large-data'

const filterTarget = 'unique-filter-target'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Output }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-large-data')
  await Extension.addWebExtension(extensionUri)
  await Output.show()

  // act
  await Output.selectChannel('large-data')

  // assert
  const output = Locator('.Output')
  await expect(output).toBeVisible()
  const lines = Locator('.OutputContent .Line')
  const offscreenLine = lines.nth(100)
  const thumb = Locator('.Output .ScrollBarThumb')
  await expect(offscreenLine).toHaveCount(0)
  await expect(thumb).toBeVisible()
  const lastDataLine = Locator('.OutputContent .Line:nth-last-child(2)')
  await expect(lastDataLine).toHaveText(`line 09999 ${filterTarget}`)

  // Scroll back to the first rows through the DOM event listener.
  // @ts-expect-error The locator accepts event initialization objects at runtime.
  await Locator('.OutputContent').dispatchEvent('wheel', { bubbles: true, deltaMode: 0, deltaY: -1_000_000 })
  await Command.execute('Output.refresh')
  await expect(lines.first()).toHaveText('line 00000')
  await expect(offscreenLine).toHaveCount(0)

  // Scroll down and back up through the wheel listener.
  // @ts-expect-error The locator accepts event initialization objects at runtime.
  await Locator('.OutputContent').dispatchEvent('wheel', { bubbles: true, deltaMode: 0, deltaY: 36 })
  await Command.execute('Output.refresh')
  await expect(lines.first()).toHaveText('line 00002')
  // @ts-expect-error The locator accepts event initialization objects at runtime.
  await Locator('.OutputContent').dispatchEvent('wheel', { bubbles: true, deltaMode: 0, deltaY: -36 })
  await Command.execute('Output.refresh')
  await expect(lines.first()).toHaveText('line 00000')

  // Route a scrollbar pointer-down at the track center and verify the visible rows move.
  // @ts-expect-error The locator accepts event initialization objects at runtime.
  await Locator('.OutputContent').dispatchEvent('wheel', { bubbles: true, deltaMode: 0, deltaY: 36 })
  await Command.execute('Output.refresh')
  await expect(lines.first()).toHaveText('line 00002')
  const components = (await Command.execute('ComponentState.getComponents')) as readonly { moduleId: string; uid: number }[]
  const outputComponent = components.find((component) => component.moduleId === 'Output')
  if (!outputComponent) {
    throw new Error('Expected an Output component')
  }
  const outputState = (await Command.execute('ComponentState.getState', outputComponent.uid)) as { height: number; y: number }
  await Command.execute('Output.handleScrollBarPointerDown', outputState.y + outputState.height / 2)
  await Command.execute('Output.refresh')
  await expect(lines.first()).not.toHaveText('line 00002')

  // Scrolling beyond either end remains clamped to the available content.
  // @ts-expect-error The locator accepts event initialization objects at runtime.
  await Locator('.OutputContent').dispatchEvent('wheel', { bubbles: true, deltaMode: 0, deltaY: 1_000_000 })
  await Command.execute('Output.refresh')
  await expect(lastDataLine).toHaveText(`line 09999 ${filterTarget}`)

  // act
  await Output.handleFilterInput(filterTarget)

  // assert
  await expect(lines).toHaveCount(1)
  await expect(lines.first()).toHaveText(`line 09999 ${filterTarget}`)
  await expect(output).toBeVisible()
  await expect(thumb).toHaveCount(0)
}
