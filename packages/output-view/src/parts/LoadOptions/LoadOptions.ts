import type { Option } from '../Option/Option.ts'
import * as InputName from '../InputName/InputName.ts'

export const loadOptions = async (platform: number): Promise<readonly Option[]> => {
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
