import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import type { Option } from '../Option/Option.ts'

export const getExtensionDetailOptions = async (): Promise<readonly Option[]> => {
  const uri = 'memfs:///extension-detail-output.txt'
  try {
    await FileSystemWorker.readFile(uri)
    return [{ id: 'ExtensionDetail', label: 'Extension Detail', uri }]
  } catch {
    return []
  }
}
