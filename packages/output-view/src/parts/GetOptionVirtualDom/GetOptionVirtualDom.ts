import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'

export const getOptionVirtualDom = (option: Option): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Option',
      childCount: 1,
    },
    text(option.id),
  ]
}
