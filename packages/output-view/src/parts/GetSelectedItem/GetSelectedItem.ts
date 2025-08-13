import * as InputName from '../InputName/InputName.ts'

export const getSelectedItem = (platform: number): string => {
  if (platform === /* Web */ 1) {
    return ''
  }
  return InputName.MainProcess
}
