import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.rapid-updates'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-rapid-updates').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'rapid-updates')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('rapid-updates')
  const text = Locator('.OutputContent')
  
  // Verify that all rapid updates were processed
  await expect(text).toContainText('RAPID UPDATES TEST')
  await expect(text).toContainText('Rapid update 1')
  await expect(text).toContainText('Rapid update 100')
  await expect(text).toContainText('START_MIXED')
  await expect(text).toContainText('END_MIXED')
  await expect(text).toContainText('SINGLE_CHARS')
  await expect(text).toContainText('SPECIAL_RAPID')
  await expect(text).toContainText('RAPID UPDATES COMPLETE')
  
  // Test filtering on specific rapid updates
  await Command.execute('Output.handleFilterInput', 'MARKER_40', /* Script */ 2)
  await expect(text).toContainText('MARKER_40')
  
  // Test filtering on cycles
  await Command.execute('Output.handleFilterInput', 'CYCLE_3_START', /* Script */ 2)
  await expect(text).toContainText('CYCLE_3_START')
  await expect(text).toContainText('CYCLE_3_END')
  
  // Test filtering on special characters
  await Command.execute('Output.handleFilterInput', '🚀', /* Script */ 2)
  await expect(text).toContainText('🚀')
  
  // Clear filter and test large chunks
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  await Command.execute('Output.handleFilterInput', 'Large chunk', /* Script */ 2)
  await expect(text).toContainText('Large chunk')
  
  // Test that single characters were processed correctly
  await Command.execute('Output.handleFilterInput', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', /* Script */ 2)
  await expect(text).toContainText('SINGLE_CHARS')
  
  // Verify final state
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  await expect(text).toContainText('RAPID UPDATES COMPLETE')
}
