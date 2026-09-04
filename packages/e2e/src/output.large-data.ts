import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.large-data'

const lineCount = 10_000
const filterTarget = 'unique-filter-target'

export const test: Test = async ({ expect, Extension, FileSystem, Locator, Output }) => {
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
  await expect(lines).toHaveCount(lineCount + 1)
  const lastDataLine = lines.nth(lineCount - 1)
  await expect(lastDataLine).toHaveText(`line 09999 ${filterTarget}`)

  // act
  await Output.handleFilterInput(filterTarget)

  // assert
  await expect(lines).toHaveCount(1)
  await expect(lines.first()).toHaveText(`line 09999 ${filterTarget}`)
  await expect(output).toBeVisible()
}
