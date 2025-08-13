import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { Option } from '../Option/Option.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getActionButtonsVirtualDom } from '../GetActionButtonsVirtualDom/GetActionButtonsVirtualDom.ts'
import { getFilterVirtualDom } from '../GetFilterVirtualDom/GetFilterVirtualDom.ts'
import { getSelectVirtualDom } from '../GetSelectVirtualDom/GetSelectVirtualDom.ts'

const getChildCount = (buttonsLength: number): number => {
  const selectLength = 1
  const filterCount = 1
  return buttonsLength + filterCount + selectLength
}

export const getActionsVirtualDom = (options: readonly Option[]): readonly VirtualDomNode[] => {
  const buttons: readonly ActionButton[] = [
    {
      id: 'Clear',
      label: 'Clear',
      icon: 'MaskIconClearAll',
    },
    {
      id: 'Scroll Lock',
      label: 'Scroll Lock',
      icon: 'MaskIconListFlat',
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: 'MaskIconListFlat',
    },
  ]
  const childCount = getChildCount(buttons.length)
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Actions,
      role: AriaRoles.ToolBar,
      childCount,
    },
    ...getFilterVirtualDom(),
    ...getSelectVirtualDom(options),
    ...getActionButtonsVirtualDom(buttons),
  ]
}
