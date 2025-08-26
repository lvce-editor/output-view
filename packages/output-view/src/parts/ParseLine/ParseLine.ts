import type { LinePart } from '../LinePart/LinePart.ts'
import * as LinePartType from '../LinePartType/LinePartType.ts'

const urlRegex = /(?:https?:\/\/\S+|file:\/\/\S+)/g

export const parseLine = (line: string): readonly LinePart[] => {
	const parts: LinePart[] = []
	let lastIndex = 0
	for (;;) {
		const match = urlRegex.exec(line)
		if (!match) {
			break
		}
		const start = match.index
		if (start > lastIndex) {
			parts.push({ type: LinePartType.Text, value: line.slice(lastIndex, start) })
		}
		parts.push({ type: LinePartType.Link, value: match[0] })
		lastIndex = start + match[0].length
	}
	if (lastIndex < line.length) {
		parts.push({ type: LinePartType.Text, value: line.slice(lastIndex) })
	}
	if (parts.length === 0) {
		return [{ type: LinePartType.Text, value: '' }]
	}
	return parts
}


