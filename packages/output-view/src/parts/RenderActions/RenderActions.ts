import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { OutputState } from '../OutputState/OutputState.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'

export const renderActions = (state: OutputState): readonly VirtualDomNode[] => {
  const { options, buttons } = state
  const dom = GetActionsVirtualDom.getActionsVirtualDom(options, buttons)
  return dom
}
