const RE_URL = /(?:https?:\/\/\S+|file:\/\/\S+)/

export const getLinkMatch = (text: string): string | null => {
  const m = text.match(RE_URL)
  return m ? m[0] : null
}
