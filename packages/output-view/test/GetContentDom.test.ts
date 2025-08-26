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

test('getContentDom - highlights matches with provided filterValue', () => {
  const dom = getContentDom([[{ type: LinePartType.Text, value: 'xyz' }]], '', 'y')
  // container + line parent + segments: x, <span>y</span>, z -> 1 + 1 + 3 = 5 total nodes
  // In our implementation, the line parent is 1, and segments produce 4 nodes (text + span + text + text?)
  // Actual length observed includes container(1) + line parent(1) + 4 segment nodes = 6
  expect(dom.length).toBe(6)
  expect(dom[2]).toEqual({ type: 12, text: 'x', childCount: 0 })
  expect(dom[3]).toEqual({ type: 8, className: 'Highlight', childCount: 1 })
  expect(dom[4]).toEqual({ type: 12, text: 'y', childCount: 0 })
})
