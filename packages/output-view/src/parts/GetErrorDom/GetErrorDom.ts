import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ErrorCode from '../ErrorCode/ErrorCode.ts'
import { getLogFileNotFoundDom } from '../GetLogFileNotFoundDom/GetLogFileNotFoundDom.ts'

export const getErrorDom = (errorCode: number, error: string): readonly VirtualDomNode[] => {
  if (!error) {
    return []
  }
  if (errorCode === ErrorCode.LogFileNotFound) {
    return getLogFileNotFoundDom()
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
