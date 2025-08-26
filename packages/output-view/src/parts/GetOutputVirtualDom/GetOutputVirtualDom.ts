import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'
import type { LinePart } from '../LinePart/LinePart.ts'

export const getOutputVirtualDom = (lines: readonly (readonly LinePart[])[], errorCode: number, error: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.Viewlet, ClassNames.Output),
      childCount: 1,
    },
    ...getContentDom(lines, error),
    ...getErrorDom(errorCode, error),
  ]
}
