const RE_URL = /(?:https?:\/\/|file:\/\/|lvce(?:-oss)?:\/\/)\S+/
const trailingPunctuation = '!),.;?]}'

const trimTrailingPunctuation = (value: string): string => {
  let end = value.length
  while (end > 0 && trailingPunctuation.includes(value[end - 1])) {
    end--
  }
  return value.slice(0, end)
}

export const getLinkMatch = (text: string): string | null => {
  const match = text.match(RE_URL)
  return match ? trimTrailingPunctuation(match[0]) : null
}
