import { expect, test } from '@jest/globals'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should return an array of event listeners', () => {
  const result = renderEventListeners()
  expect(result).toBeDefined()
})

test('renderEventListeners - routes wheel and scrollbar pointer input', () => {
  const result = renderEventListeners()
  expect(result).toContainEqual({
    name: 'handleWheel',
    params: ['handleWheel', 'event.deltaMode', 'event.deltaY'],
    passive: true,
  })
  expect(result).toContainEqual({
    name: 'handleScrollBarPointerDown',
    params: ['handleScrollBarPointerDown', 'event.clientY'],
    preventDefault: true,
    stopPropagation: true,
    trackPointerEvents: ['handleScrollBarMove', 'handleScrollBarPointerCaptureLost'],
  })
})

test('renderEventListeners - prevents native navigation for source links', () => {
  const result = renderEventListeners()
  expect(result).toContainEqual({
    name: 'handleSourceLinkClick',
    params: ['handleSourceLinkClick', 'event.target.href', 'event.target.dataset.line', 'event.target.dataset.column'],
    preventDefault: true,
  })
})
