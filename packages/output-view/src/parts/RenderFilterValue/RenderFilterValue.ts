import type { OutputState } from '../OutputState/OutputState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderFilterValue = (oldState: OutputState, newState: OutputState): ViewletCommand => {
  return ['Viewlet.setValueByName', newState.parentId, InputName.Filter, newState.filterValue]
}
