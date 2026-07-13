import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'output.extension-channel-write-before-activate'

export const skip = 1

const expectAddWebExtensionToThrow = async (Extension: any, uri: string, expectedMessage: string): Promise<void> => {
  try {
    await Extension.addWebExtension(uri)
  } catch (error) {
    if (error instanceof Error && error.message.includes(expectedMessage)) {
      return
    }
    throw error
  }
  throw new Error(`Expected addWebExtension to throw ${expectedMessage}`)
}

export const test: Test = async ({ Extension }) => {
  const extensionUri = import.meta.resolve('../fixtures/sample.extension-api-output-channel-write-before-activate')
  await expectAddWebExtensionToThrow(Extension, extensionUri, 'output channel sample-extension-output-before-activate cannot be written before activate')
}
