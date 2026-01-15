export interface OutputErrorEvent {
  readonly message: string
  readonly seq: number
  readonly type: 'error'
}
