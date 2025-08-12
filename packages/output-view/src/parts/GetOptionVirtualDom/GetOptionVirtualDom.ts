import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../Option/Option.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getOptionVirtualDom = (option: Option): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Option,
      className: ClassNames.Option,
      childCount: 1,
    },
    text(option.id),
  ]
}
