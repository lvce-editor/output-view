import * as InputName from '../InputName/InputName.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getSelectedItem = (selectedOption: string, platform: number): string => {
  if (selectedOption) {
    return selectedOption
  }
  if (platform === PlatformType.Web) {
    return ''
  }
  return InputName.MainProcess
}
