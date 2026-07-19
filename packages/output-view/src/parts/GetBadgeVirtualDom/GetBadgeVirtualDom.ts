import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getBadgeVirtualDom = (className: string, count: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: mergeClassNames('Badge', className),
      type: VirtualDomElements.Div,
    },
    text(String(count)),
  ]
}
