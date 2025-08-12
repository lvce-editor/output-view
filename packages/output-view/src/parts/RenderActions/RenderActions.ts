import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'

export const renderActions = (uid: number): readonly VirtualDomNode[] => {
  const actions: readonly any[] = [
    {
      id: 'test',
      name: 'test',
    },
  ]
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
