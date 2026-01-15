import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getOptionVirtualDom } from '../src/parts/GetOptionVirtualDom/GetOptionVirtualDom.ts'

test('getOptionVirtualDom - renders option with text', () => {
  const dom = getOptionVirtualDom({ id: 'main', label: 'Main', uri: 'file:///main' })

  expect(dom[0]).toEqual({
    childCount: 1,
    className: ClassNames.Option,
    type: VirtualDomElements.Option,
    value: 'main',
  })
  expect(dom[1]).toEqual({ childCount: 0, text: 'Main', type: 12 })
})
