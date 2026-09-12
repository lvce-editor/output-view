import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as OutputStrings from '../OutputStrings/OutputStrings.ts'

const filterInputClassName = mergeClassNames(ClassNames.InputBox, ClassNames.FilterInput)

const filterNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Filter,
  type: VirtualDomElements.Div,
}

export const getFilterVirtualDom = (): readonly VirtualDomNode[] => {
  const placeholder = OutputStrings.filter()
  return [
    filterNode,
    {
      childCount: 0,
      className: filterInputClassName,
      name: InputName.Filter,
      onInput: DomEventListenerFunctions.HandleFilterInput,
      placeholder,
      type: VirtualDomElements.Input,
    },
  ]
}
