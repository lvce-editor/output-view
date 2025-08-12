import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getErrorDom = (error: string): readonly VirtualDomNode[] => {
  if (!error) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Error',
      tabIndex: 0,
      childCount: 1,
    },
    text(error),
  ]
}
