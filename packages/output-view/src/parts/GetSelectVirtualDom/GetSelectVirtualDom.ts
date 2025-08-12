import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as InputName from '../InputName/InputName.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getOptionVirtualDom } from '../GetOptionVirtualDom/GetOptionVirtualDom.ts'

export const getSelectVirtualDom = (options: readonly Option[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Select,
      className: ClassNames.Select,
      childCount: options.length,
      name: InputName.Output,
      onChange: DomEventListenerFunctions.HandleSelect,
    },
    ...options.flatMap(getOptionVirtualDom),
  ]
}
