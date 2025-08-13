import type { OutputAppendEvent } from './OutputAppendEvent.ts'
import type { OutputClearEvent } from './OutputClearEvent.ts'
import type { OutputReplaceEvent } from './OutputReplaceEvent.ts'
import type { OutputErrorEvent } from './OutputErrorEvent.ts'

export type OutputEvent = OutputAppendEvent | OutputClearEvent | OutputReplaceEvent | OutputErrorEvent
