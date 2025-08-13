import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActionsVirtualDom } from '../src/parts/GetActionsVirtualDom/GetActionsVirtualDom.ts'

test('getActionsVirtualDom - wraps select in actions container', () => {
  const options = [
    { id: 'one', uri: 'file:///one' },
    { id: 'two', uri: 'file:///two' },
  ]

  const result = getActionsVirtualDom(options)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Actions,
    role: 'toolbar',
    childCount: 1,
  })
  // container + select + 2 nodes per option
  expect(result.length).toBe(2 + 2 * options.length)
  expect(result[1].type).toBe(VirtualDomElements.Select)
})


