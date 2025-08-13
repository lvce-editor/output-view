import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getActionButtonVirtualDom } from '../src/parts/GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'

test('getActionButtonVirtualDom - renders button and mask icon', () => {
  const dom = getActionButtonVirtualDom({ id: 'clear', label: 'Clear', icon: 'IconClearAll' })
  expect(dom[0]).toMatchObject({
    type: VirtualDomElements.Button,
    name: 'clear',
    title: 'Clear',
    childCount: 1,
  })
  expect(dom[1].type).toBe(VirtualDomElements.Div)
})
