import type { ActionButton } from '../ActionButton/ActionButton.ts'
import type { Option } from '../Option/Option.ts'
import type { Line } from '../Line/Line.ts'

export interface OutputState {
  readonly buttons: readonly ActionButton[]
  readonly collapsedUris: readonly string[]
  readonly error: string
  readonly errorCode: number
  readonly filteredItems: readonly Line[]
  readonly filterValue: string
  readonly focusedIndex: number
  readonly height: number
  readonly inputSource: number
  readonly itemHeight: number
  readonly listItems: readonly Line[]
  readonly logLevel: number
  readonly maxLineY: number
  readonly message: string
  readonly minLineY: number
  readonly options: readonly Option[]
  readonly parentId: number
  readonly platform: number
  readonly scrollLockEnabled: boolean
  readonly selectedOption: string
  readonly smallWidthBreakPoint: number
  readonly uid: number
  readonly uri: string
  readonly watchId: number
  readonly width: number
  readonly workspaceUri: string
  readonly x: number
  readonly y: number
}
