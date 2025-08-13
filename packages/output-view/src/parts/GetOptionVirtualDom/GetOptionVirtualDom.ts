import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getOptionVirtualDom = (option: Option): readonly VirtualDomNode[] => {
  const { id, label } = option
  return [
    {
      type: VirtualDomElements.Option,
      className: ClassNames.Option,
      childCount: 1,
      value: id,
    },
    text(label),
  ]
}
