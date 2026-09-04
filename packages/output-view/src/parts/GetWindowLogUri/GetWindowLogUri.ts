import { FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'

const legacyWindowLogFileName = 'log-window.txt'

const isWindowLogFileName = (name: string): boolean => {
  return /^\d+\.txt$/.test(name) || /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.\d{3}Z\.txt$/.test(name)
}

export const getLatestLogFileName = (dirents: readonly any[]): string => {
  let latest = ''
  for (const dirent of dirents) {
    if (dirent.type === 1 && isWindowLogFileName(dirent.name) && dirent.name > latest) {
      latest = dirent.name
    }
  }
  return latest
}

export const getWindowLogUri = async (logsFolderUri: string): Promise<string> => {
  const legacyWindowLogUri = `${logsFolderUri}/${legacyWindowLogFileName}`
  try {
    const windowId = await RendererWorker.getWindowId()
    const windowLogsFolderUri = `${logsFolderUri}/${windowId}`
    const dirents = await FileSystemWorker.readDirWithFileTypes(windowLogsFolderUri)
    const latestLogFileName = getLatestLogFileName(dirents)
    if (latestLogFileName) {
      return `${windowLogsFolderUri}/${latestLogFileName}`
    }
  } catch {
    return legacyWindowLogUri
  }
  return legacyWindowLogUri
}
