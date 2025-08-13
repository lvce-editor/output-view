import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import { getActionButtonVirtualDom } from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

export const getActionButtonsVirtualDom = (buttons: readonly ActionButton[]): readonly VirtualDomNode[] => {
  return buttons.flatMap(getActionButtonVirtualDom)
}
