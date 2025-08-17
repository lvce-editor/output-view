import type { Option } from '../Option/Option.ts'
import { getExtensionOptions } from '../GetExtensionOptions/GetExtensionOptions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const loadOptions = async (platform: number, logsFolderPath: string): Promise<readonly Option[]> => {
  const extensionOptions = await getExtensionOptions()
  if (platform === PlatformType.Web) {
    return extensionOptions
  }
  return [
    {
      id: InputName.MainProcess,
      label: 'Main Process',
      uri: `${logsFolderPath}/log-main-process.txt`,
    },
    {
      id: InputName.SharedProcess,
      label: 'Shared Process',
      uri: `${logsFolderPath}/log-shared-process.txt`,
    },
    ...extensionOptions,
  ]
}
