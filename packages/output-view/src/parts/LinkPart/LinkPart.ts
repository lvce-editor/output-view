import type * as LinePartType from '../LinePartType/LinePartType.ts'

export interface LinkPart {
  readonly className?: string
  readonly label?: string
  readonly type: typeof LinePartType.Link
  readonly value: string
}
