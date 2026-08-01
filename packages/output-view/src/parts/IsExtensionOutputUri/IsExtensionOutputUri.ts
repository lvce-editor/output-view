const ExtensionOutputPrefix = 'extension-output://'

export const isExtensionOutputUri = (uri: string): boolean => {
  return uri.startsWith(ExtensionOutputPrefix)
}
