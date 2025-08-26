import * as LinePartType from '../LinePartType/LinePartType.ts'

export interface TextPart {
  readonly type: typeof LinePartType.Text
  readonly value: string
}

export interface LinkPart {
  readonly type: typeof LinePartType.Link
  readonly value: string
}

export type LinePart = TextPart | LinkPart


