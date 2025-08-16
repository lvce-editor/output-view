import { test, expect } from '@jest/globals'
import * as OutputStrings from '../src/parts/OutputStrings/OutputStrings.ts'

test('OutputStrings - returns localized strings', () => {
  expect(OutputStrings.output()).toBe('output')
  expect(OutputStrings.clearOutput()).toBe('clear output')
  expect(OutputStrings.turnOffAutoScroll()).toBe('Turn auto scrolling off')
  expect(OutputStrings.openLogFile()).toBe('open output log file')
  expect(OutputStrings.logFileNotFound()).toBe('The log file was not found.')
})

test('OutputStrings - returns all localized strings', () => {
  expect(OutputStrings.output()).toBe('output')
  expect(OutputStrings.clearOutput()).toBe('clear output')
  expect(OutputStrings.turnOffAutoScroll()).toBe('Turn auto scrolling off')
  expect(OutputStrings.settings()).toBe('Settings')
  expect(OutputStrings.openLogFile()).toBe('open output log file')
  expect(OutputStrings.setLogLevel()).toBe('Set Log Level')
  expect(OutputStrings.logFileNotFound()).toBe('The log file was not found.')
  expect(OutputStrings.filter()).toBe('Filter')
})
