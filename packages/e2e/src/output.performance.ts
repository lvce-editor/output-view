import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.performance'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-performance').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'performance-test')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('performance-test')
  const text = Locator('.OutputContent')
  
  // Verify that the performance test completed
  await expect(text).toContainText('PERFORMANCE TEST START')
  await expect(text).toContainText('PERFORMANCE TEST COMPLETE')
  
  // Test that filtering works even with large amounts of data
  await Command.execute('Output.handleFilterInput', 'PERFORMANCE MILESTONE', /* Script */ 2)
  await expect(text).toContainText('PERFORMANCE MILESTONE')
  
  // Test filtering on specific chunks
  await Command.execute('Output.handleFilterInput', 'Chunk 500', /* Script */ 2)
  await expect(text).toContainText('Chunk 500')
  
  // Clear filter and verify end marker
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  await expect(text).toContainText('PERFORMANCE TEST COMPLETE')
  
  // Verify that the UI remains responsive (this is more of a manual check)
  // The test should complete without timeout, indicating good performance
  await expect(select).toBeVisible()
  await expect(text).toBeVisible()
}
