import type { OutputState } from '../OutputState/OutputState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderSelectedItem = (oldState: OutputState, newState: OutputState): ViewletCommand => {
  const value = newState.selectedOption
  const name = InputName.Output
  return ['Viewlet.setValueByName', newState.uid, name, value]
}
