import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineDom } from '../GetLineDom/GetLineDom.ts'
import type { Line } from '../Line/Line.ts'

export const getContentDom = (lines: readonly Line[], error: string): readonly VirtualDomNode[] => {
  if (error) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.OutputContent,
      role: 'log',
      tabIndex: 0,
      childCount: lines.length,
    },
    ...lines.flatMap(getLineDom),
  ]
}
