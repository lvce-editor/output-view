import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getChevronDownVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: `${ClassNames.Chevron} MaskIconChevronDown ${extraClassName}`,
    childCount: 0,
  }
}

export const getChevronRightVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: `${ClassNames.Chevron} MaskIconChevronRight ${extraClassName}`,
    childCount: 0,
  }
}
