import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getActionButtonVirtualDom = (button: ActionButton): readonly VirtualDomNode[] => {
  const { id, label, icon } = button
  return [
    {
      type: VirtualDomElements.Button,
      className: ClassNames.IconButton,
      name: id,
      title: label,
      childCount: 1,
      onClick: DomEventListenerFunctions.HandleButtonClick,
    },
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.MaskIcon, icon),
    },
  ]
}
