import type { ActionButton } from '../ActionButton/ActionButton.ts'

export const loadButtons = (): readonly ActionButton[] => {
  return [
    {
      id: 'Clear',
      label: 'Clear',
      icon: 'MaskIconClearAll',
    },
    {
      id: 'Scroll Lock',
      label: 'Scroll Lock',
      icon: 'MaskIconListFlat',
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: 'MaskIconListFlat',
    },
  ]
}
