import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Line } from '../Line/Line.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'

export const getOutputVirtualDom = (lines: readonly Line[], errorCode: number, error: string, filterValue: string = ''): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.Viewlet, ClassNames.Output),
      childCount: 1,
    },
    ...getContentDom(lines, error, filterValue),
    ...getErrorDom(errorCode, error),
  ]
}
