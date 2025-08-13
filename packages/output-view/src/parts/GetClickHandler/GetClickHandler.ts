import type { ClickHandler } from '../Clickhandler/ClickHandler.ts'
import type { OutputState } from '../OutputState/OutputState.ts'
import { clear } from '../Clear/Clear.ts'
import * as InputName from '../InputName/InputName.ts'

const noop = async (state: OutputState): Promise<OutputState> => {
  return state
}

export const getClickHandler = (name: string): ClickHandler => {
  switch (name) {
    case InputName.Clear:
      return clear
    default:
      return noop
  }
}
