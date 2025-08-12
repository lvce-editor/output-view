import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineDom } from '../GetLineDom/GetLineDom.ts'

export const getOutputVirtualDom = (lines: readonly string[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.Viewlet, ClassNames.Output),
      childCount: 1,
    },
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
