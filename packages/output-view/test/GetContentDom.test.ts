import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getContentDom } from '../src/parts/GetContentDom/GetContentDom.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('getContentDom - renders container and lines', () => {
  const dom = getContentDom([[{ type: LinePartType.Text, value: 'x' }], [{ type: LinePartType.Text, value: 'y' }]], '')
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'OutputContent',
    role: 'log',
    tabIndex: 0,
    childCount: 2,
  })
  // container + two lines (each: parent + text)
  expect(dom.length).toBe(1 + 2 * 2)
})

test('getContentDom - returns empty when error present', () => {
  expect(getContentDom([[{ type: LinePartType.Text, value: 'a' }]], 'boom')).toEqual([])
})
