import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Command, expect, FileSystem, Locator }) => {
  // arrange
  const uri = 'memfs:///extension-detail-output.txt'
  await FileSystem.writeFile(uri, 'Error: Failed to load Changelog content\n')
  const content = Locator('.OutputContent')
  const select = Locator('[name="output"]')

  // act
  await Command.execute('Layout.showPanel', 'Output', 'ExtensionDetail')

  // assert
  await expect(select).toHaveValue('ExtensionDetail')
  await expect(content).toContainText('Error: Failed to load Changelog content')

  // act
  await FileSystem.writeFile(uri, 'Error: Failed to load Readme content\n')
  // The test filesystem helper writes through the renderer, bypassing worker file watchers.
  await Command.execute('Output.refresh')

  // assert
  await expect(content).toContainText('Error: Failed to load Readme content')

  // act
  await Command.execute('Output.clear')

  // assert
  await expect(content).toHaveText('')
}
