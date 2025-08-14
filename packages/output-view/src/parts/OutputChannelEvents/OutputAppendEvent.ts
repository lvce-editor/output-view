export interface OutputAppendEvent {
  readonly type: 'append'
  readonly seq: number
  readonly lines: readonly string[]
}
