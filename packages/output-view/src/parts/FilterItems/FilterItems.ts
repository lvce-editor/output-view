import type { Line } from '../Line/Line.ts'
import type { LinePart } from '../LinePart/LinePart.ts'

const getTextFromParts = (parts: readonly LinePart[]): string => {
  let result = ''
  for (const part of parts) {
    result += part.value
  }
  return result
}

export const filterItems = (items: readonly Line[], filterValue: string): readonly Line[] => {
  if (!filterValue) {
    return items
  }
  return items.filter((parts) => getTextFromParts(parts).includes(filterValue))
}
