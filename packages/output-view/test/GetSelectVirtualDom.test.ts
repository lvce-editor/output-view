import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../src/parts/Option/Option.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getSelectVirtualDom } from '../src/parts/GetSelectVirtualDom/GetSelectVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getSelectVirtualDom - renders select with options', () => {
  const options: readonly Option[] = [
    { id: 'a', label: 'A', uri: 'file:///a' },
    { id: 'b', label: 'B', uri: 'file:///b' },
  ]

  const dom = getSelectVirtualDom(options)

  expect(dom[0]).toEqual({
    childCount: options.length,
    className: ClassNames.Select,
    name: InputName.Output,
    onChange: DomEventListenerFunctions.HandleSelect,
    type: VirtualDomElements.Select,
  })
  // select + 2 nodes per option
  expect(dom.length).toBe(1 + 2 * options.length)
})
