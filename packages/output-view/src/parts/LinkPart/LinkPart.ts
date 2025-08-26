import * as LinePartType from '../LinePartType/LinePartType.ts'

export interface LinkPart {
  readonly type: typeof LinePartType.Link
  readonly value: string
}


