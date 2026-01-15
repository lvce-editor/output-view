import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getOptionVirtualDom } from '../GetOptionVirtualDom/GetOptionVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getSelectVirtualDom = (options: readonly Option[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: options.length,
      className: ClassNames.Select,
      name: InputName.Output,
      onChange: DomEventListenerFunctions.HandleSelect,
      type: VirtualDomElements.Select,
    },
    ...options.flatMap(getOptionVirtualDom),
  ]
}
