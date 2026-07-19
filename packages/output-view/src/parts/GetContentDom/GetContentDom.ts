import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Line } from '../Line/Line.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineDom } from '../GetLineDom/GetLineDom.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'

export const getContentDom = (lines: readonly Line[], error: string): readonly VirtualDomNode[] => {
  if (error) {
    return []
  }
  return [
    {
      childCount: lines.length,
      className: ClassNames.OutputContent,
      role: AriaRoles.Log,
      tabIndex: TabIndex.Focusable,
      type: VirtualDomElements.Div,
    },
    ...lines.flatMap(getLineDom),
  ]
}
