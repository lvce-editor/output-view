import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { OutputState } from '../OutputState/OutputState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'
import { getOutputVirtualDom } from '../GetOutputVirtualDom/GetOutputVirtualDom.ts'

export const renderItems = (oldState: OutputState, newState: OutputState): ViewletCommand => {
  const dom: readonly VirtualDomNode[] = getOutputVirtualDom(newState.listItems, newState.error)
  return ['Viewlet.setDom2', dom]
}
