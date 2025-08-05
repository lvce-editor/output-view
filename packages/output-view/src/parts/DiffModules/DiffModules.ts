import type { OutputState } from '../OutputState/OutputState.ts'
import * as DiffFilterValue from '../DiffFilterValue/DiffFilterValue.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffType from '../DiffType/DiffType.ts'

interface DiffFunction<T> {
  (oldState: T, newState: T): boolean
}

export const modules: readonly DiffFunction<OutputState>[] = [DiffItems.isEqual, DiffFilterValue.isEqual]

export const numbers: readonly number[] = [DiffType.RenderItems, DiffType.RenderFilterValue]
