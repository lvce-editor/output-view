import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as InputName from '../InputName/InputName.ts'
import * as OutputStrings from '../OutputStrings/OutputStrings.ts'

export const loadButtons = (): readonly ActionButton[] => {
  return [
    {
      id: InputName.Clear,
      label: OutputStrings.clearOutput(),
      icon: 'MaskIconClearAll',
    },
    {
      id: InputName.ScrollLock,
      label: OutputStrings.turnOffAutoScroll(),
      icon: 'MaskIconListFlat',
    },
    {
      id: InputName.Settings,
      label: OutputStrings.settings(),
      icon: 'MaskIconSettingsGear',
    },
  ]
}
