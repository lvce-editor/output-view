export const removeElement = <T>(array: readonly T[], element: T): readonly T[] => {
  const index = array.indexOf(element)
  if (index === -1) {
    return array
  }
  return [...array.slice(0, index), ...array.slice(index + 1)]
}
