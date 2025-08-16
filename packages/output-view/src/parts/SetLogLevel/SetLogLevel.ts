import type { OutputState } from '../OutputState/OutputState.ts'

export const setLogLevel = async (state: OutputState, logLevel: number): Promise<OutputState> => {
  return {
    ...state,
    logLevel,
  }
}
