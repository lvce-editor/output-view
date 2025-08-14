import type { DiffFunction } from '../DiffFunction/DiffFunction.ts'
import type { OutputState } from '../OutputState/OutputState.ts'
import * as DiffFilterValue from '../DiffFilterValue/DiffFilterValue.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffSelectedItem from '../DiffSelectedItem/DiffSelectedItem.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const modules: readonly DiffFunction<OutputState>[] = [DiffItems.isEqual, DiffFilterValue.isEqual, DiffSelectedItem.isEqual]

export const numbers: readonly number[] = [DiffType.RenderItems, DiffType.RenderFilterValue, DiffType.RenderSelectedItem]
