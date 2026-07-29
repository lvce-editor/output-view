import type * as LinePartType from '../LinePartType/LinePartType.ts'

export interface LogLevelPart {
  readonly type: typeof LinePartType.LogLevel
  readonly value: string
}
