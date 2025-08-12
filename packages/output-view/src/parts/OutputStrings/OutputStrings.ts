import * as I18NString from '@lvce-editor/i18n'
import * as UiStrings from '../UiStrings/UiStrings.ts'

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

export const logFileNotFound = (): string => {
  return I18NString.i18nString(UiStrings.LogFileNotFound)
}
