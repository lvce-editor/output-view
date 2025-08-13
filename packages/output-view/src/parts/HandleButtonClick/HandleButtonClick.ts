import type { OutputState } from '../OutputState/OutputState.ts'
import { getClickHandler } from '../GetClickHandler/GetClickHandler.ts'

export const handleButtonClick = async (state: OutputState, name: string): Promise<OutputState> => {
  const fn = getClickHandler(name)
  return fn(state)
}
