import { test, expect, jest } from '@jest/globals'
import type { ViewletCommand } from '../src/parts/ViewletCommand/ViewletCommand.ts'
import * as ApplyRender from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as OutputStates from '../src/parts/OutputStates/OutputStates.ts'
import { render2 } from '../src/parts/Render2/Render2.ts'

test('render2 should throw error when uid not found in OutputStates', () => {
  const uid = 999_999 // Use a uid that definitely doesn't exist
  const diffResult = [1, 2, 3]

  // The function should throw when trying to get a non-existent uid
  expect(() => render2(uid, diffResult)).toThrow()
})

test('render2 should throw error with invalid diff result', () => {
  const uid = 888_888 // Use another uid that doesn't exist
  const diffResult = [999] // Use an invalid diff type

  // The function should throw when trying to get a non-existent uid
  expect(() => render2(uid, diffResult)).toThrow()
})

test('render2 should throw error with empty diff result', () => {
  const uid = 777_777 // Use another uid that doesn't exist
  const diffResult: readonly number[] = []

  // The function should throw when trying to get a non-existent uid
  expect(() => render2(uid, diffResult)).toThrow()
})

test('render2 should work correctly with valid state and diff result', () => {
  const uid = 123
  const oldState = createDefaultState()
  const newState = { ...oldState, message: 'updated' }
  const diffResult = [1, 2, 3]
  
  // Set up the state in OutputStates
  OutputStates.set(uid, oldState, newState)
  
  // Mock ApplyRender to avoid complex dependencies
  const mockCommands: ViewletCommand[] = [['test', null]]
  const applyRenderSpy = jest.spyOn(ApplyRender, 'applyRender')
  applyRenderSpy.mockReturnValue(mockCommands)
  
  const result = render2(uid, diffResult)
  
  expect(applyRenderSpy).toHaveBeenCalledWith(oldState, newState, diffResult)
  expect(result).toEqual(mockCommands)
  
  applyRenderSpy.mockRestore()
})

test('render2 should update state correctly', () => {
  const uid = 456
  const oldState = createDefaultState()
  const newState = { ...oldState, error: 'test error' }
  const diffResult = [4, 5]
  
  // Set up the state in OutputStates
  OutputStates.set(uid, oldState, newState)
  
  // Mock ApplyRender
  const mockCommands: ViewletCommand[] = [['update', null]]
  const applyRenderSpy = jest.spyOn(ApplyRender, 'applyRender')
  applyRenderSpy.mockReturnValue(mockCommands)
  
  const result = render2(uid, diffResult)
  
  // Verify that the state was updated (newState becomes both old and new)
  const currentState = OutputStates.get(uid)
  expect(currentState.newState).toEqual(newState)
  expect(currentState.oldState).toEqual(newState)
  
  expect(result).toEqual(mockCommands)
  
  applyRenderSpy.mockRestore()
})
