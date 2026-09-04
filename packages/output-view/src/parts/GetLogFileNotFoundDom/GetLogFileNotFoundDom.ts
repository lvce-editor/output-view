import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as OutputStrings from '../OutputStrings/OutputStrings.ts'
import * as TabIndex from '../TabIndex/TabIndex.ts'

const messageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Message,
  tabIndex: TabIndex.Focusable,
  type: VirtualDomElements.Div,
}

export const getLogFileNotFoundDom = (): readonly VirtualDomNode[] => {
  return [messageNode, text(OutputStrings.logFileNotFound())]
}
