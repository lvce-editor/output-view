import type { OutputAppendEvent } from './OutputAppendEvent.ts'
import type { OutputClearEvent } from './OutputClearEvent.ts'
import type { OutputErrorEvent } from './OutputErrorEvent.ts'
import type { OutputReplaceEvent } from './OutputReplaceEvent.ts'

export type OutputEvent = OutputAppendEvent | OutputClearEvent | OutputReplaceEvent | OutputErrorEvent
