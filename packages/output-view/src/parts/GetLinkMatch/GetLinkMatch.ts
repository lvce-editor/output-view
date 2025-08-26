const RE_URL = /(?:https?:\/\/\S+|file:\/\/\S+)/

export const getLinkMatch = (text: string): string | null => {
  const match = text.match(RE_URL)
  return match ? match[0] : null
}
