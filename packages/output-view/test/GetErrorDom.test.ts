import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ErrorCode from '../src/parts/ErrorCode/ErrorCode.ts'
import { getErrorDom } from '../src/parts/GetErrorDom/GetErrorDom.ts'

test('getErrorDom - empty when no error', () => {
  expect(getErrorDom(0, '')).toEqual([])
})

test('getErrorDom - log file not found uses special message', () => {
  const dom = getErrorDom(ErrorCode.LogFileNotFound, 'log file not found')
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Message',
    tabIndex: 0,
    childCount: 1,
  })
})

test('getErrorDom - generic error wraps text', () => {
  const dom = getErrorDom(0, 'oops')
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Error',
    tabIndex: 0,
    childCount: 1,
  })
  expect(dom[1]).toEqual({ type: 12, text: 'oops', childCount: 0 })
})
