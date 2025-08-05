import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getBadgeVirtualDom } from '../src/parts/GetBadgeVirtualDom/GetBadgeVirtualDom.ts'

test('getBadgeVirtualDom returns correct virtual DOM structure', () => {
  const result = getBadgeVirtualDom('error', 5)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Badge error',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: '5',
    childCount: 0,
  })
})

test('getBadgeVirtualDom with zero count', () => {
  const result = getBadgeVirtualDom('warning', 0)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Badge warning',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: '0',
    childCount: 0,
  })
})

test('getBadgeVirtualDom with large count', () => {
  const result = getBadgeVirtualDom('info', 999)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Badge info',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: '999',
    childCount: 0,
  })
})

test('getBadgeVirtualDom with empty className', () => {
  const result = getBadgeVirtualDom('', 3)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: 'Badge ',
    childCount: 1,
  })
  expect(result[1]).toEqual({
    type: 12,
    text: '3',
    childCount: 0,
  })
})
