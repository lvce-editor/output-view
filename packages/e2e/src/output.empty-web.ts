import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.empty-web'

export const test: Test = async ({ expect, Locator, Output }) => {
  await Output.show()

  const content = Locator('.OutputContent')
  const error = Locator('.Error')
  await expect(content).toBeVisible()
  await expect(error).toHaveCount(0)

  await Output.show()

  await expect(content).toBeVisible()
  await expect(error).toHaveCount(0)
}
