import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { LinePart } from '../LinePart/LinePart.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.Line,
  childCount: 1,
}

export const getLineDom = (parts: readonly LinePart[]): readonly VirtualDomNode[] => {
  const children: VirtualDomNode[] = []
  for (const part of parts) {
    if (part.type === LinePartType.Text) {
      children.push(text(part.value))
    } else {
      children.push({ type: VirtualDomElements.A, href: part.value, childCount: 1 }, text(part.value))
    }
  }
  const lineNode: VirtualDomNode = { ...parentNode, childCount: children.length }
  return [lineNode, ...children]
}
