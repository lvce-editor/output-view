import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getActionButtonVirtualDom = (button: ActionButton): readonly VirtualDomNode[] => {
  const { id, label, icon } = button
  return [
    {
      type: VirtualDomElements.Button,
      classNames: ClassNames.IconButton,
      title: label,
      childCount: 1,
      name: id,
    },
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.MaskIcon, `MaskIcon${icon}`),
    },
  ]
}
