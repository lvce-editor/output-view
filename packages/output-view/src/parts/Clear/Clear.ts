import type { OutputState } from '../OutputState/OutputState.ts'

export const clear = async (state: OutputState): Promise<OutputState> => {
  const { selectedOption, options } = state
  const option = options.find((option) => option.id === selectedOption)
  if (!option) {
    return state
  }
  // const { uri } = option
  // TODO clear file with that uri
  return {
    ...state,
  }
}
