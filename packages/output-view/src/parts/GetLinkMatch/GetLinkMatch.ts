// Returns the first link match (http, https, or file URL) in the given text, or null
// if none found.
export const getLinkMatch = (text: string): string | null => {
  const urlRegex = /(?:https?:\/\/\S+|file:\/\/\S+)/
  const m = text.match(urlRegex)
  return m ? m[0] : null
}
