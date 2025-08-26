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

const pushHighlightedText = (children: VirtualDomNode[], value: string, filterValue: string): void => {
  if (!filterValue) {
    children.push(text(value))
    return
  }
  let from = 0
  // highlight all occurrences of filterValue in order
  // case-sensitive to match existing filtering behavior
  for (;;) {
    const index = value.indexOf(filterValue, from)
    if (index === -1) {
      if (from < value.length) {
        children.push(text(value.slice(from)))
      }
      break
    }
    if (index > from) {
      children.push(text(value.slice(from, index)))
    }
    children.push({ type: VirtualDomElements.Span, className: ClassNames.Highlight, childCount: 1 }, text(filterValue))
    from = index + filterValue.length
  }
}

export const getLineDom = (parts: readonly LinePart[], filterValue: string = ''): readonly VirtualDomNode[] => {
  const children: VirtualDomNode[] = []
  for (const part of parts) {
    if (part.type === LinePartType.Text) {
      pushHighlightedText(children, part.value, filterValue)
    } else {
      // Skip highlighting inside links for now
      children.push({ type: VirtualDomElements.A, href: part.value, target: '_blank', rel: 'noopener noreferrer', childCount: 1 }, text(part.value))
    }
  }
  const lineNode: VirtualDomNode = { ...parentNode, childCount: children.length }
  return [lineNode, ...children]
}
