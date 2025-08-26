import type { LinePart } from '../LinePart/LinePart.ts'

const getTextFromParts = (parts: readonly LinePart[]): string => {
\tlet result = ''
\tfor (const part of parts) {
\t	result += part.value
\t}
\treturn result
}

export const filterItems = (items: readonly (readonly LinePart[])[], filterValue: string): readonly (readonly LinePart[])[] => {
\tif (!filterValue) {
\t	return items
\t}
\treturn items.filter((parts) => getTextFromParts(parts).includes(filterValue))
}
