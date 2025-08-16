import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFilterVirtualDom = (): readonly VirtualDomNode[] => {
  const placeholder = 'Filter'
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Filter,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Input,
      className: mergeClassNames(ClassNames.InputBox, ClassNames.FilterInput),
      childCount: 0,
      placeholder,
      onInput: DomEventListenerFunctions.HandleFilterInput,
      name: InputName.Filter,
    },
  ]
}
