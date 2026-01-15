import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Line } from '../Line/Line.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'

export const getOutputVirtualDom = (lines: readonly Line[], errorCode: number, error: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: mergeClassNames(ClassNames.Viewlet, ClassNames.Output),
      type: VirtualDomElements.Div,
    },
    ...getContentDom(lines, error),
    ...getErrorDom(errorCode, error),
  ]
}
