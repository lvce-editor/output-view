import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getLineDom } from '../src/parts/GetLineDom/GetLineDom.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'

test('getLineDom - returns parent div and text node', () => {
  const result = getLineDom([{ type: LinePartType.Text, value: 'hello' }])

  expect(result[0]).toEqual({
    childCount: 1,
    className: 'Line',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'hello',
    type: 12,
  })
})

test('getLineDom - renders link as anchor node with text', () => {
  const result = getLineDom([
    { type: LinePartType.Text, value: 'see ' },
    { type: LinePartType.Link, value: 'https://example.com' },
  ])
  expect(result[0]).toEqual({
    childCount: 3,
    className: 'Line',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({ childCount: 0, text: 'see ', type: 12 })
  expect(result[2]).toEqual({ childCount: 1, href: 'https://example.com', rel: 'noopener noreferrer', target: '_blank', type: VirtualDomElements.A })
  expect(result[3]).toEqual({ childCount: 0, text: 'https://example.com', type: 12 })
})
