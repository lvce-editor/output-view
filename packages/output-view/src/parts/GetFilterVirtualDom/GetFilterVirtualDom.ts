import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getFilterVirtualDom = (): readonly VirtualDomNode[] => {
  const placeholder = 'Filter'
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Filter',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Input,
      className: 'InputBox FilterInput',
      childCount: 0,
      placeholder,
    },
  ]
}
