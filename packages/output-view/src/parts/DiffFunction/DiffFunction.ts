export interface DiffFunction<T> {
  (oldState: T, newState: T): boolean
}
