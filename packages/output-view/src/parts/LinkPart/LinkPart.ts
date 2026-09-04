import type * as LinePartType from '../LinePartType/LinePartType.ts'

export interface LinkPart {
  readonly className?: string
  readonly columnNumber?: number
  readonly label?: string
  readonly lineNumber?: number
  readonly type: typeof LinePartType.Link
  readonly value: string
}
