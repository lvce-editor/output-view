import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.controls'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-basic')
  await Extension.addWebExtension(extensionUri)
  await Output.show()

  // assert
  const actions = Locator('.Actions')
  await expect(actions).toBeVisible()
  await expect(actions).toHaveAttribute('role', 'toolbar')

  const filter = actions.locator('.FilterInput')
  await expect(filter).toBeVisible()
  await expect(filter).toHaveAttribute('name', 'filter')
  await expect(filter).toHaveAttribute('placeholder', 'Filter')

  const select = actions.locator('[name="output"]')
  await expect(select).toBeVisible()
  await expect(select.locator('option')).toHaveCount(1)
  await expect(select.locator('option')).toHaveText('Xyz')

  const buttons = actions.locator('.IconButton')
  await expect(buttons).toHaveCount(3)
  const clearButton = buttons.nth(0)
  const scrollLockButton = buttons.nth(1)
  const settingsButton = buttons.nth(2)
  await expect(clearButton).toHaveAttribute('name', 'Clear')
  await expect(clearButton).toHaveAttribute('title', 'clear output')
  await expect(scrollLockButton).toHaveAttribute('name', 'ScrollLock')
  await expect(scrollLockButton).toHaveAttribute('title', 'Turn auto scrolling off')
  await expect(settingsButton).toHaveAttribute('name', 'Settings')
  await expect(settingsButton).toHaveAttribute('title', 'Settings')
}
