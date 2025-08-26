import type { Line } from '../Line/Line.ts'

export interface LoadLinesResult {
  readonly lines: readonly Line[]
  readonly error: string
  readonly code: number
}
