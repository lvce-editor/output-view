import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getBadgeVirtualDom = (className: string, count: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: `Badge ${className}`,
      type: VirtualDomElements.Div,
    },
    text(`${count}`),
  ]
}
