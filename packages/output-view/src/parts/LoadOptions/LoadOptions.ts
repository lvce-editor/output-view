import type { Option } from '../Option/Option.ts'
import * as InputName from '../InputName/InputName.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

// TODO load options from extensions
export const loadOptions = async (platform: number): Promise<readonly Option[]> => {
  if (platform === PlatformType.Web) {
    return []
  }
  return [
    {
      id: InputName.MainProcess,
      label: 'Main Process',
      uri: 'file:///tmp/log-main-process.txt',
    },
    {
      id: InputName.SharedProcess,
      label: 'Shared Process',
      uri: 'file:///tmp/log-shared-process.txt',
    },
  ]
}
