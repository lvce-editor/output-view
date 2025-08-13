export interface OutputErrorEvent {
  readonly type: 'error'
  readonly seq: number
  readonly message: string
}
