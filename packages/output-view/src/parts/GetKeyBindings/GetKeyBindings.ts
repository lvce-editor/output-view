import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'Problems.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.focusFirst',
      key: KeyCode.PageUp,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.focusLast',
      key: KeyCode.PageDown,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.selectCurrent',
      key: KeyCode.Space,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.handleArrowLeft',
      key: KeyCode.LeftArrow,
      when: WhenExpression.FocusProblems,
    },
    {
      command: 'Problems.handleArrowRight',
      key: KeyCode.RightArrow,
      when: WhenExpression.FocusProblems,
    },
  ]
}
