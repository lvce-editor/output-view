import * as I18NString from '@lvce-editor/i18n'

/**
 * @enum {string}
 */
const UiStrings = {
  Output: 'output',
  ClearOutput: 'clear output',
  TurnOffAutoScroll: 'Turn auto scrolling off',
  OpenLogFile: 'open output log file',
}

export const output = (): string => {
  return I18NString.i18nString(UiStrings.Output)
}

export const clearOutput = (): string => {
  return I18NString.i18nString(UiStrings.ClearOutput)
}

export const turnOffAutoScroll = (): string => {
  return I18NString.i18nString(UiStrings.TurnOffAutoScroll)
}

export const openLogFile = (): string => {
  return I18NString.i18nString(UiStrings.OpenLogFile)
}
