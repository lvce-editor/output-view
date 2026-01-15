export interface OutputReplaceEvent {
  readonly lines: readonly string[]
  readonly seq: number
  readonly type: 'replace'
}
