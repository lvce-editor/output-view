import type { OutputState } from '../OutputState/OutputState.ts'

export const handleFilterInput = async (state: OutputState, value: string): Promise<OutputState> => {
  return {
    ...state,
    filterValue: value,
  }
}
