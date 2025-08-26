import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getLineDom } from '../src/parts/GetLineDom/GetLineDom.ts'

test('getLineDom - returns parent div and text node', () => {
  const result = getLineDom('hello')

  expect(result).toHaveLength(2)
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
