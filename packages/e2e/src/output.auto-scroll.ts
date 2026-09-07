import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.auto-scroll'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Output, QuickPick }) => {
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample.output-channel-auto-scroll'))
  await Output.show()
  await Output.selectChannel('auto-scroll')
  const lastLine = Locator('.OutputContent .Line:nth-last-child(2)')
  await expect(lastLine).toHaveText('line 999')
  await expect(lastLine).toBeVisible()

  await QuickPick.open()
  await QuickPick.setValue('>Append Output Line')
  await QuickPick.selectItem('Append Output Line')
  // The test editor does not forward extension output change notifications yet.
  await Command.execute('Output.refresh')
  await expect(lastLine).toHaveText('line 1000')
  await expect(lastLine).toBeVisible()

  await Command.execute('Output.handleKeyDown', 'Home')
  const firstLine = Locator('.OutputContent .Line').first()
  await expect(firstLine).toHaveText('line 0')
  await QuickPick.open()
  await QuickPick.setValue('>Append Output Line')
  await QuickPick.selectItem('Append Output Line')
  // The test editor does not forward extension output change notifications yet.
  await Command.execute('Output.refresh')
  await expect(firstLine).toHaveText('line 0')

  await Command.execute('Output.handleKeyDown', 'End')
  await expect(lastLine).toHaveText('line 1001')
  await QuickPick.open()
  await QuickPick.setValue('>Append Output Line')
  await QuickPick.selectItem('Append Output Line')
  // The test editor does not forward extension output change notifications yet.
  await Command.execute('Output.refresh')
  await expect(lastLine).toHaveText('line 1002')
  const offscreenLine = Locator('.OutputContent .Line').nth(100)
  await expect(offscreenLine).toHaveCount(0)
}
