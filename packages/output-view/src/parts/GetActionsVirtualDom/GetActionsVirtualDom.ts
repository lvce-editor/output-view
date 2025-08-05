import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'

export const getActionsVirtualDom = (actions: readonly ViewletAction[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Actions,
      role: AriaRoles.ToolBar,
      childCount: actions.length,
    },
  ]
}
