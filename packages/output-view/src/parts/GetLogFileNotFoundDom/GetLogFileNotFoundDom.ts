import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as OutputStrings from '../OutputStrings/OutputStrings.ts'

export const getLogFileNotFoundDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Message',
      tabIndex: 0,
      childCount: 1,
    },
    text(OutputStrings.logFileNotFound()),
  ]
}
