import type { LinkPart } from '../LinkPart/LinkPart.ts'
import type { LogLevelPart } from '../LogLevelPart/LogLevelPart.ts'
import type { RepeatCountPart } from '../RepeatCountPart/RepeatCountPart.ts'
import type { TextPart } from '../TextPart/TextPart.ts'

export type LinePart = TextPart | LinkPart | LogLevelPart | RepeatCountPart
