import type * as LinePartType from '../LinePartType/LinePartType.ts'

export interface RepeatCountPart {
  readonly type: typeof LinePartType.RepeatCount
  readonly value: string
}
