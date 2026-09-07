import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getOptionVirtualDom = (option: Option, selected = false): readonly VirtualDomNode[] => {
  const { id, label } = option
  return [
    {
      childCount: 1,
      className: ClassNames.Option,
      selected,
      type: VirtualDomElements.Option,
      value: id,
    },
    text(label),
  ]
}
