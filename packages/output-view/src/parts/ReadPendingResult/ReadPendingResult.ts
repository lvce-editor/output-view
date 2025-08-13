import type { OutputEvent } from '../OutputChannelEvents/OutputEvent.ts'

export interface ReadPendingResult {
  readonly events: readonly OutputEvent[]
  readonly hasMore: boolean
}
