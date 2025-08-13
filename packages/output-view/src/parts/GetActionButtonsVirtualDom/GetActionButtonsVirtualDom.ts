import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'

export const getActionButtonsVirtualDom = (buttons: readonly ActionButton[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Button,
      childCount: 1,
    },
    text('Clear Output'),

    {
      type: VirtualDomElements.Button,
      childCount: 1,
    },
    text('Scroll Lock'),
    {
      type: VirtualDomElements.Button,
      childCount: 1,
    },
    text('Set Log Level'),
  ]
}
