import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'
import type { ViewletAction } from '../ViewletAction/ViewletAction.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getSelectVirtualDom } from '../GetSelectVirtualDom/GetSelectVirtualDom.ts'

export const getActionsVirtualDom = (actions: readonly ViewletAction[]): readonly VirtualDomNode[] => {
  const options: readonly Option[] = [
    {
      id: 'Main',
      uri: '',
    },
    {
      id: 'Shared Process',
      uri: '',
    },
  ]
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Actions,
      role: AriaRoles.ToolBar,
      childCount: 1,
    },
    ...getSelectVirtualDom(options),
  ]
}
