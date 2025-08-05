import type { ViewletCommand } from '../ViewletCommand/ViewletCommand.ts'

export interface Renderer<T> {
  (oldState: T, newState: T): ViewletCommand
}
