export interface TextPart {
	readonly type: 'text'
	readonly value: string
}

export interface LinkPart {
	readonly type: 'link'
	readonly value: string
}

export type LinePart = TextPart | LinkPart


