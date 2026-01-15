import type { Line } from '../Line/Line.ts'

export interface LoadLinesResult {
  readonly code: number
  readonly error: string
  readonly lines: readonly Line[]
}
