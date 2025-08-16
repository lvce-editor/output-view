import type { RestoredState } from '../RestoredState/RestoredState.ts'

const getSavedFilterValue = (savedState: any): string => {
  if (savedState && typeof savedState.filterValue === 'string') {
    return savedState.filterValue
  }
  return ''
}

const getSavedSelectedOption = (savedState: any): string => {
  if (savedState && typeof savedState.selectedOption === 'string') {
    return savedState.selectedOption
  }
  return ''
}

export const restoreState = (savedState: unknown): RestoredState => {
  const filterValue = getSavedFilterValue(savedState)
  const selectedOption = getSavedSelectedOption(savedState)
  return {
    filterValue,
    selectedOption,
  }
}
