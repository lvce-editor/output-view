import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
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
      childCount: 1,
      className: ClassNames.Error,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    text(error),
  ]
}
