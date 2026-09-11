import type { Option } from '../Option/Option.ts'
import { getExtensionDetailOptions } from '../GetExtensionDetailOptions/GetExtensionDetailOptions.ts'
import { getExtensionOptions } from '../GetExtensionOptions/GetExtensionOptions.ts'
import { getLogsDir } from '../GetLogsDir/GetLogsDir.ts'
import { getWindowLogUri } from '../GetWindowLogUri/GetWindowLogUri.ts'
import * as InputName from '../InputName/InputName.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const loadOptions = async (platform: number): Promise<readonly Option[]> => {
  const extensionOptions = await getExtensionOptions()
  const detailOptions = await getExtensionDetailOptions()
  if (platform === PlatformType.Web) {
    return [...detailOptions, ...extensionOptions]
  }
  const logsFolderUri = await getLogsDir()
  const windowLogUri = platform === PlatformType.Electron ? await getWindowLogUri(logsFolderUri) : `${logsFolderUri}/log-window.txt`

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
    {
      id: InputName.Window,
      label: 'Window',
      uri: windowLogUri,
    },
    ...detailOptions,
    ...extensionOptions,
  ]
}
