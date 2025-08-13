import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../src/parts/ActionButton/ActionButton.ts'
import type { Option } from '../src/parts/Option/Option.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getActionsVirtualDom } from '../src/parts/GetActionsVirtualDom/GetActionsVirtualDom.ts'

test('getActionsVirtualDom - wraps select in actions container', () => {
  const options: readonly Option[] = [
    { id: 'one', uri: 'file:///one', label: 'One' },
    { id: 'two', uri: 'file:///two', label: 'Two' },
  ]

  const buttons: readonly ActionButton[] = []
  const result = getActionsVirtualDom(options, buttons)

  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Actions,
    role: 'toolbar',
    childCount: 1,
  })
})
