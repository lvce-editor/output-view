import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.explorer-accessibility'

export const test: Test = async ({ FileSystem, Workspace, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')

  // act
  await Workspace.setPath(tmpDir)
  await Main.openUri(`${tmpDir}/test.txt`)
}
