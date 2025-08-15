import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFilterVirtualDom = (): readonly VirtualDomNode[] => {
  const placeholder = 'Filter'
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Filter',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Input,
      className: 'InputBox FilterInput',
      childCount: 0,
      placeholder,
      onInput: DomEventListenerFunctions.HandleFilterInput,
      name: InputName.Filter,
    },
  ]
}
