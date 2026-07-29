import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { LinePart } from '../LinePart/LinePart.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

interface LinePartDom {
  readonly childCount: number
  readonly nodes: readonly VirtualDomNode[]
}

const noNodes: readonly VirtualDomNode[] = []
const repeatCountNode: VirtualDomNode = { childCount: 1, className: ClassNames.OutputRepeatCount, type: VirtualDomElements.Span }
const spaceNode = text(' ')

const getLevel = (parts: readonly LinePart[]): string => {
  return parts.find((part) => part.type === LinePartType.LogLevel)?.value || ''
}

const getLinePartDom = (part: LinePart): LinePartDom => {
  switch (part.type) {
    case LinePartType.Link: {
      const linkNode: VirtualDomNode = {
        childCount: 1,
        href: part.value,
        rel: 'noopener noreferrer',
        target: '_blank',
        type: VirtualDomElements.A,
        ...(part.className && { className: part.className }),
      }
      return {
        childCount: 1,
        nodes: [linkNode, text(part.label || part.value)],
      }
    }
    case LinePartType.RepeatCount:
      return {
        childCount: 2,
        nodes: [repeatCountNode, text(part.value), spaceNode],
      }
    case LinePartType.Text:
      return {
        childCount: 1,
        nodes: [text(part.value)],
      }
    default:
      return {
        childCount: 0,
        nodes: noNodes,
      }
  }
}

export const getLineDom = (parts: readonly LinePart[]): readonly VirtualDomNode[] => {
  const children: VirtualDomNode[] = []
  let childCount = 0
  for (const part of parts) {
    const partDom = getLinePartDom(part)
    children.push(...partDom.nodes)
    childCount += partDom.childCount
  }
  const level = getLevel(parts)
  const className = level ? mergeClassNames(ClassNames.Line, level) : ClassNames.Line
  const lineNode: VirtualDomNode = { childCount, className, type: VirtualDomElements.Div }
  return [lineNode, ...children]
}
