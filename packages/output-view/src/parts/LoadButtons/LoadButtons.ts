import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as InputName from '../InputName/InputName.ts'
import * as OutputStrings from '../OutputStrings/OutputStrings.ts'

export const loadButtons = (): readonly ActionButton[] => {
  return [
    {
      icon: 'MaskIconClearAll',
      id: InputName.Clear,
      label: OutputStrings.clearOutput(),
    },
    {
      icon: 'MaskIconListFlat',
      id: InputName.ScrollLock,
      label: OutputStrings.turnOffAutoScroll(),
    },
    {
      icon: 'MaskIconSettingsGear',
      id: InputName.Settings,
      label: OutputStrings.settings(),
    },
  ]
}
