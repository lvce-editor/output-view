import { initializeExtensionHost } from '../InitializeExtensionHostWorker/InitializeExtensionHostWorker.ts'
import { initializeFileSystemWorker } from '../InitializeFileSystemWorker/InitializeFileSystemWorker.ts'

export const initialize = async (): Promise<void> => {
  await Promise.all([initializeFileSystemWorker(), initializeExtensionHost()])
}
