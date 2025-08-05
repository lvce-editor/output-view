import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { OutputState } from '../OutputState/OutputState.ts'
import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'

export const renderItems = (oldState: OutputState, newState: OutputState): ViewletCommand => {
  // TODO
  const dom: readonly VirtualDomNode[] = []
  return ['Viewlet.setDom2', dom]
}
