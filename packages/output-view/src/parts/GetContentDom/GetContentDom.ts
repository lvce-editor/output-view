import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Line } from '../Line/Line.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineDom } from '../GetLineDom/GetLineDom.ts'

export const getContentDom = (lines: readonly Line[], error: string): readonly VirtualDomNode[] => {
  if (error) {
    return []
  }
  return [
    {
      childCount: lines.length,
      className: ClassNames.OutputContent,
      role: 'log',
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...lines.flatMap(getLineDom),
  ]
}
