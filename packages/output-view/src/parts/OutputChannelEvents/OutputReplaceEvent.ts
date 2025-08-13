export interface OutputReplaceEvent {
  readonly type: 'replace'
  readonly seq: number
  readonly lines: readonly string[]
}
