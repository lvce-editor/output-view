import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.special-chars'

export const test: Test = async ({ Command, expect, Extension, FileSystem, Locator, Panel }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir({ scheme: 'file' })
  await FileSystem.writeFile(`${tmpDir}/test.txt`, 'div')
  const extensionUri = import.meta.resolve('../fixtures/sample.output-channel-special-chars').toString()
  await Extension.addWebExtension(extensionUri)
  await Panel.open('Output')

  // act
  await Command.execute('Output.selectChannel', 'special-chars')

  // assert
  const select = Locator('[name="output"]')
  await expect(select).toHaveValue('special-chars')
  const text = Locator('.OutputContent')
  
  // Verify special characters are displayed correctly
  await expect(text).toContainText('SPECIAL CHARACTERS TEST')
  await expect(text).toContainText('<script>alert("test")</script>')
  await expect(text).toContainText('🚀 🌟 💻 🎉')
  await expect(text).toContainText('中文 العربية русский 日本語 한국어')
  await expect(text).toContainText('∑ ∏ ∫ ∂ ∇ ∆')
  await expect(text).toContainText('$ € £ ¥')
  await expect(text).toContainText('café résumé naïve')
  await expect(text).toContainText('← → ↑ ↓')
  
  // Test filtering with special characters
  await Command.execute('Output.handleFilterInput', '🚀', /* Script */ 2)
  await expect(text).toContainText('🚀')
  
  // Test filtering with HTML entities
  await Command.execute('Output.handleFilterInput', '<script>', /* Script */ 2)
  await expect(text).toContainText('<script>alert("test")</script>')
  
  // Test filtering with accented characters
  await Command.execute('Output.handleFilterInput', 'café', /* Script */ 2)
  await expect(text).toContainText('café résumé naïve')
  
  // Test filtering with mathematical symbols
  await Command.execute('Output.handleFilterInput', '∞', /* Script */ 2)
  await expect(text).toContainText('∞')
  
  // Clear filter and verify RTL text
  await Command.execute('Output.handleFilterInput', '', /* Script */ 2)
  await expect(text).toContainText('שלום עולם العربية')
  
  // Test box drawing characters
  await Command.execute('Output.handleFilterInput', '┌─┬─┐', /* Script */ 2)
  await expect(text).toContainText('┌─┬─┐')
}
