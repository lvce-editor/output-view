import * as InputName from '../InputName/InputName.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getSelectedItem = (platform: number): string => {
  if (platform === PlatformType.Web) {
    return ''
  }
  return InputName.MainProcess
}
