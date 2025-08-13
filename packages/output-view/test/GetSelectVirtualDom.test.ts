import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Option } from '../src/parts/Option/Option.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getSelectVirtualDom } from '../src/parts/GetSelectVirtualDom/GetSelectVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getSelectVirtualDom - renders select with options', () => {
  const options: readonly Option[] = [
    { id: 'a', uri: 'file:///a', label: 'A' },
    { id: 'b', uri: 'file:///b', label: 'B' },
  ]

  const dom = getSelectVirtualDom(options)

  expect(dom[0]).toEqual({
    type: VirtualDomElements.Select,
    className: ClassNames.Select,
    childCount: options.length,
    name: InputName.Output,
    onChange: DomEventListenerFunctions.HandleSelect,
  })
  // select + 2 nodes per option
  expect(dom.length).toBe(1 + 2 * options.length)
})
