import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'

export const getActionVirtualDom = (action: ViewletAction): readonly VirtualDomNode[] => {
  switch (action.type) {
    default:
      return []
  }
}
