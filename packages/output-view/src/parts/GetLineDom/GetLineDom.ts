import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.Line,
  childCount: 1,
}

export const getLineDom = (line: string): readonly VirtualDomNode[] => {
  return [parentNode, text(line)]
}
