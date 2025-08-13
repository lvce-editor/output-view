import type { OutputState } from '../OutputState/OutputState.ts'

export interface ClickHandler {
  (state: OutputState): Promise<OutputState>
}
