import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as InputName from '../InputName/InputName.ts'

export const loadButtons = (): readonly ActionButton[] => {
  return [
    {
      id: InputName.Clear,
      label: 'Clear',
      icon: 'MaskIconClearAll',
    },
    {
      id: InputName.ScrollLock,
      label: 'Scroll Lock',
      icon: 'MaskIconListFlat',
    },
    {
      id: InputName.Settings,
      label: 'Settings',
      icon: 'MaskIconSettingsGear',
    },
  ]
}
