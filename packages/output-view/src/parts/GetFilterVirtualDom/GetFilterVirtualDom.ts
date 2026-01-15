import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFilterVirtualDom = (): readonly VirtualDomNode[] => {
  const placeholder = 'Filter'
  return [
    {
      childCount: 1,
      className: ClassNames.Filter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.FilterInput),
      name: InputName.Filter,
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder,
      type: VirtualDomElements.Input,
    },
  ]
}
