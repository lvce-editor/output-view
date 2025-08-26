import type { LinePart } from '../LinePart/LinePart.ts'

export interface LoadLinesResult {
  readonly lines: readonly (readonly LinePart[])[]
  readonly error: string
  readonly code: number
}
