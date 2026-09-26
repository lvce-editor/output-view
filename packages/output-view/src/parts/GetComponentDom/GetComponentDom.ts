import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as OutputStates from '../OutputStates/OutputStates.ts'
import { getOutputVirtualDom } from '../GetOutputVirtualDom/GetOutputVirtualDom.ts'

export const getComponentDom = (uid: number): readonly VirtualDomNode[] => {
  const { newState } = OutputStates.get(uid)
  return getOutputVirtualDom(
    newState.filteredItems.slice(newState.minLineY, newState.maxLineY),
    newState.errorCode,
    newState.error,
    newState.scrollBarHeight,
    newState.scrollBarActive,
  )
}
