import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getBadgeVirtualDom } from '../src/parts/GetBadgeVirtualDom/GetBadgeVirtualDom.ts'

test('getBadgeVirtualDom returns correct virtual DOM structure', () => {
  const result = getBadgeVirtualDom('error', 5)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'Badge error',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '5',
    type: 12,
  })
})

test('getBadgeVirtualDom with zero count', () => {
  const result = getBadgeVirtualDom('warning', 0)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'Badge warning',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '0',
    type: 12,
  })
})

test('getBadgeVirtualDom with large count', () => {
  const result = getBadgeVirtualDom('info', 999)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'Badge info',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '999',
    type: 12,
  })
})

test('getBadgeVirtualDom with empty className', () => {
  const result = getBadgeVirtualDom('', 3)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'Badge ',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: '3',
    type: 12,
  })
})
