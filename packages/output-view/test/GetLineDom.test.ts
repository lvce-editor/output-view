import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getLineDom } from '../src/parts/GetLineDom/GetLineDom.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('getLineDom - returns parent div and text node', () => {
  const result = getLineDom([{ type: LinePartType.Text, value: 'hello' }])

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Line',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: 'hello',
    childCount: 0,
  })
})

test('getLineDom - renders link as anchor node with text', () => {
  const result = getLineDom([
    { type: LinePartType.Text, value: 'see ' },
    { type: LinePartType.Link, value: 'https://example.com' },
  ])
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Line',
    childCount: 3,
  })
  expect(result[1]).toEqual({ type: 12, text: 'see ', childCount: 0 })
  expect(result[2]).toEqual({ type: VirtualDomElements.A, href: 'https://example.com', childCount: 1 })
  expect(result[3]).toEqual({ type: 12, text: 'https://example.com', childCount: 0 })
})
