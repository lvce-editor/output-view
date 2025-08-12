import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ErrorCode from '../ErrorCode/ErrorCode.ts'

export const getErrorDom = (errorCode: number, error: string): readonly VirtualDomNode[] => {
  if (!error) {
    return []
  }

  if (errorCode === ErrorCode.LogFileNotFound) {
    return [
      {
        type: VirtualDomElements.Div,
        className: 'Message',
        tabIndex: 0,
        childCount: 1,
      },
      text(error),
    ]
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Error',
      tabIndex: 0,
      childCount: 1,
    },
    text(error),
  ]
}
