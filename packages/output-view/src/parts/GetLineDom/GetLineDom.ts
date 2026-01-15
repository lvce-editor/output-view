import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { LinePart } from '../LinePart/LinePart.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

const parentNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Line,
  type: VirtualDomElements.Div,
}

export const getLineDom = (parts: readonly LinePart[]): readonly VirtualDomNode[] => {
  const children: VirtualDomNode[] = []
  for (const part of parts) {
    if (part.type === LinePartType.Text) {
      children.push(text(part.value))
    } else {
      children.push({ childCount: 1, href: part.value, rel: 'noopener noreferrer', target: '_blank', type: VirtualDomElements.A }, text(part.value))
    }
  }
  const lineNode: VirtualDomNode = { ...parentNode, childCount: children.length }
  return [lineNode, ...children]
}
