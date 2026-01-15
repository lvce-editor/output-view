export interface OutputAppendEvent {
  readonly lines: readonly string[]
  readonly seq: number
  readonly type: 'append'
}
