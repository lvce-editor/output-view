import * as ActionType from '../ActionType/ActionType.ts'
import * as Icon from '../Icon/Icon.ts'
import { OutputState } from '../OutputState/OutputState.ts'
import * as ViewletOutputStrings from '../OutputStrings/OutputStrings.ts'

const toSelectOption = (option: any): number => {
  return option.name
}

const toSelectOptions = (options: readonly any[]): readonly any[] => {
  return options.map(toSelectOption)
}

export const getActions = (state: OutputState): readonly any[] => {
  const { options } = state
  return [
    {
      type: ActionType.Select,
      id: ViewletOutputStrings.output(),
      options: toSelectOptions(options),
    },
    {
      type: ActionType.Button,
      id: ViewletOutputStrings.clearOutput(),
      icon: Icon.ClearAll,
    },
    {
      type: ActionType.Button,
      id: ViewletOutputStrings.turnOffAutoScroll(),
      icon: Icon.Blank,
    },
    {
      type: ActionType.Button,
      id: ViewletOutputStrings.openLogFile(),
      icon: Icon.Blank,
    },
  ]
}
