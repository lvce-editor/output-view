import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const scrollBarNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ClassNames.ScrollBar, ClassNames.ScrollBarSmall),
  onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
  type: VirtualDomElements.Div,
}

export const getScrollBarVirtualDom = (scrollBarHeight: number, scrollBarActive: boolean): readonly VirtualDomNode[] => {
  if (scrollBarHeight <= 0) {
    return []
  }
  return [
    scrollBarNode,
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.ScrollBarThumb, scrollBarActive ? ClassNames.ScrollBarThumbActive : ''),
      type: VirtualDomElements.Div,
    },
  ]
}
