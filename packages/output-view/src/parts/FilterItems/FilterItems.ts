export const filterItems = (items: readonly string[], filterValue: string): readonly string[] => {
  if (!filterValue) {
    return items
  }
  return items.filter((item) => item.includes(filterValue))
}
