import type { OutputState } from '../OutputState/OutputState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'

export const renderSelectedItem = (oldState: OutputState, newState: OutputState): ViewletCommand => {
  const value = newState.selectedOption
  const name = 'output'
  return ['Viewlet.setValueByName', name, value]
}
