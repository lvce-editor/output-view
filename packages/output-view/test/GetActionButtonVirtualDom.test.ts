import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getActionButtonVirtualDom } from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom - renders button and mask icon', () => {
  const dom = getActionButtonVirtualDom({ icon: 'IconClearAll', id: 'clear', label: 'Clear' })
  expect(dom[0]).toMatchObject({
    childCount: 1,
    name: 'clear',
    title: 'Clear',
    type: VirtualDomElements.Button,
  })
  expect(dom[1].type).toBe(VirtualDomElements.Div)
})
