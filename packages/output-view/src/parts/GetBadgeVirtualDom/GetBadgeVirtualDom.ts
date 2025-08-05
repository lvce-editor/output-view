import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getBadgeVirtualDom = (className: string, count: number): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: `Badge ${className}`,
      childCount: 1,
    },
    text(`${count}`),
  ]
}
