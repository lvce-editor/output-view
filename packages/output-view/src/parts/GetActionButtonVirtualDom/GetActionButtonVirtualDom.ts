import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getActionButtonVirtualDom = (button: ActionButton): readonly VirtualDomNode[] => {
  const { icon, id, label } = button
  return [
    {
      childCount: 1,
      className: ClassNames.IconButton,
      name: id,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      title: label,
      type: VirtualDomElements.Button,
    },
    {
      className: mergeClassNames(ClassNames.MaskIcon, icon),
      type: VirtualDomElements.Div,
    },
  ]
}
