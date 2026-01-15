import type { Option } from '../Option/Option.ts'
import { getExtensionOptions } from '../GetExtensionOptions/GetExtensionOptions.ts'
import { getLogsDir } from '../GetLogsDir/GetLogsDir.ts'
import * as InputName from '../InputName/InputName.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const loadOptions = async (platform: number): Promise<readonly Option[]> => {
  const extensionOptions = await getExtensionOptions()
  if (platform === PlatformType.Web) {
    return extensionOptions
  }
  const logsFolderUri = await getLogsDir()

  return [
    {
      id: InputName.MainProcess,
      label: 'Main Process',
      uri: `${logsFolderUri}/log-main-process.txt`,
    },
    {
      id: InputName.SharedProcess,
      label: 'Shared Process',
      uri: `${logsFolderUri}/log-shared-process.txt`,
    },
    ...extensionOptions,
  ]
}
