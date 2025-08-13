import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'

export const getActionButtonVirtualDom = (button: ActionButton): readonly VirtualDomNode[] => {
  const { id, label } = button
  return [
    {
      type: VirtualDomElements.Button,
      childCount: 1,
      name: id,
    },
    text(label),
  ]
}
