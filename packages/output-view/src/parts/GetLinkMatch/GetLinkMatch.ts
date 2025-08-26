const urlRegex = /(?:https?:\/\/\S+|file:\/\/\S+)/

export const getLinkMatch = (text: string): string | null => {
  const m = text.match(urlRegex)
  return m ? m[0] : null
}
