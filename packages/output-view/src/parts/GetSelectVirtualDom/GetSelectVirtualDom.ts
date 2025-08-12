import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker';
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'
import { getOptionVirtualDom } from '../GetOptionVirtualDom/GetOptionVirtualDom.ts'

export const getSelectVirtualDom = (options: readonly Option[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Select,
      className: 'Select',
      childCount: options.length,
    },
    ...options.flatMap(getOptionVirtualDom),
  ]
}
