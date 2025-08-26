import type * as LinePartType from '../LinePartType/LinePartType.ts'

export interface TextPart {
  readonly type: typeof LinePartType.Text
  readonly value: string
}


