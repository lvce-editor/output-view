import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Line } from '../Line/Line.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import { getErrorDom } from '../GetErrorDom/GetErrorDom.ts'
import { getScrollBarVirtualDom } from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'

const outputNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ClassNames.Viewlet, ClassNames.Output),
  type: VirtualDomElements.Div,
}

export const getOutputVirtualDom = (
  lines: readonly Line[],
  errorCode: number,
  error: string,
  scrollBarHeight = 0,
  scrollBarActive = false,
): readonly VirtualDomNode[] => {
  const scrollBarDom = error ? [] : getScrollBarVirtualDom(scrollBarHeight, scrollBarActive)
  return [
    { ...outputNode, childCount: scrollBarDom.length > 0 ? 2 : 1 },
    ...getContentDom(lines, error),
    ...getErrorDom(errorCode, error),
    ...scrollBarDom,
  ]
}
