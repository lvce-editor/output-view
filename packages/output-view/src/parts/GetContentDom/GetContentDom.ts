import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getLineDom } from '../GetLineDom/GetLineDom.ts'

export const getContentDom = (lines: readonly string[], error: string): readonly VirtualDomNode[] => {
  if (error) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: 'OutputContent',
      role: 'log',
      tabIndex: 0,
      childCount: lines.length,
    },
    ...lines.flatMap(getLineDom),
  ]
}
