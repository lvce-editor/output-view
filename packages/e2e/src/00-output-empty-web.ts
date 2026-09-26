import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.empty-web'

export const test: Test = async ({ Command, expect, Locator, Output }) => {
  await Output.show()
  await Command.execute('Output.refresh')

  const content = Locator('.OutputContent')
  const error = Locator('.Error')
  const output = Locator('.Output')
  const channelSelect = Locator('[name="output"]')
  await expect(error).toHaveCount(0)
  await expect(content).toHaveCount(1)
  await expect(output).toBeVisible()
  await expect(channelSelect).toBeVisible()

  await Output.show()
  await Command.execute('Output.refresh')

  await expect(error).toHaveCount(0)
  await expect(content).toHaveCount(1)
  await expect(output).toBeVisible()
  await expect(channelSelect).toBeVisible()
}
