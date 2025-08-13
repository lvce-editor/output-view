import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getOptionVirtualDom } from '../src/parts/GetOptionVirtualDom/GetOptionVirtualDom.ts'

test('getOptionVirtualDom - renders option with text', () => {
  const dom = getOptionVirtualDom({ id: 'main', uri: 'file:///main' })

  expect(dom[0]).toEqual({
    type: VirtualDomElements.Option,
    className: ClassNames.Option,
    childCount: 1,
  })
  expect(dom[1]).toEqual({ type: 12, text: 'main', childCount: 0 })
})


