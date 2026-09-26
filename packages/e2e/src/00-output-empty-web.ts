import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.empty-web'

export const test: Test = async ({ Command, expect, Locator, Output }) => {
  await Output.show()
  await Command.execute('Output.refresh')

  const content = Locator('.OutputContent')
  const error = Locator('.Error')
  await expect(content).toBeVisible()
  await expect(error).toHaveCount(0)

  await Output.show()
  await Command.execute('Output.refresh')

  await expect(content).toBeVisible()
  await expect(error).toHaveCount(0)
}
