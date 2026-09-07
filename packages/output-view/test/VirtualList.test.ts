import { expect, test } from '@jest/globals'
import type { Line } from '../src/parts/Line/Line.ts'
import type { OutputState } from '../src/parts/OutputState/OutputState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff2 } from '../src/parts/Diff2/Diff2.ts'
import { disableScrollLock } from '../src/parts/DisableScrollLock/DisableScrollLock.ts'
import { handleKeyDown } from '../src/parts/HandleKeyDown/HandleKeyDown.ts'
import { handleScrollBarCaptureLost } from '../src/parts/HandleScrollBarCaptureLost/HandleScrollBarCaptureLost.ts'
import { handleScrollBarClick } from '../src/parts/HandleScrollBarClick/HandleScrollBarClick.ts'
import { handleScrollBarMove } from '../src/parts/HandleScrollBarMove/HandleScrollBarMove.ts'
import { handleWheel } from '../src/parts/HandleWheel/HandleWheel.ts'
import * as LinePartType from '../src/parts/LinePartType/LinePartType.ts'
import { get, set } from '../src/parts/OutputStates/OutputStates.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'
import { updateVirtualList } from '../src/parts/UpdateVirtualList/UpdateVirtualList.ts'

const createLines = (count: number): readonly Line[] =>
  Array.from({ length: count }, (_, index) => [{ type: LinePartType.Text, value: `line ${index}` }])

const createState = (): OutputState => updateVirtualList({ ...createDefaultState(), filteredItems: createLines(10_000), height: 180 })

test('renders only the viewport at the end of a large output', () => {
  const state = createState()
  expect(state).toMatchObject({ deltaY: 179_820, finalDeltaY: 179_820, maxLineY: 10_000, minLineY: 9990, scrollBarHeight: 20 })
  const command = renderItems(state, state)
  const dom = command[2] as readonly { className?: string; text?: string }[]
  expect(dom.filter((node) => node.className === 'Line')).toHaveLength(10)
  expect(dom).toContainEqual(expect.objectContaining({ text: 'line 9999' }))
  expect(dom).not.toContainEqual(expect.objectContaining({ text: 'line 0' }))
  expect(renderCss(state, state)[2]).toContain('translate: 0 160px')
})

test('pixel scrolling includes both partially visible rows', () => {
  const state = updateVirtualList(createState(), 9)
  expect(state).toMatchObject({ deltaY: 9, maxLineY: 11, minLineY: 0 })
  expect(renderCss(state, state)[2]).toContain('margin-top: -9px')
})

test('follows appended output, pauses on scroll up and resumes at the end', () => {
  const state = createState()
  const appended = updateVirtualList({ ...state, filteredItems: createLines(10_001) })
  expect(appended.minLineY).toBe(9991)
  const scrolled = handleWheel(appended, 0, -36)
  const paused = updateVirtualList({ ...scrolled, filteredItems: createLines(10_002) })
  expect(paused.deltaY).toBe(scrolled.deltaY)
  expect(paused.followOutput).toBe(false)
  const resumed = handleKeyDown(paused, 'End')
  expect(updateVirtualList({ ...resumed, filteredItems: createLines(10_003) }).minLineY).toBe(9993)
})

test('scroll lock preserves position until disabled', async () => {
  const state = { ...createState(), scrollLockEnabled: true }
  const appended = updateVirtualList({ ...state, filteredItems: createLines(10_001) })
  expect(appended.deltaY).toBe(state.deltaY)
  const unlocked = await disableScrollLock(appended)
  expect(updateVirtualList(unlocked).minLineY).toBe(9991)
})

test('clamps cleared, shortened, hidden and invalid viewport sizes', () => {
  const state = createState()
  expect(updateVirtualList({ ...state, filteredItems: [] })).toMatchObject({ deltaY: 0, maxLineY: 0, minLineY: 0, scrollBarHeight: 0 })
  expect(updateVirtualList({ ...state, filteredItems: createLines(2), followOutput: false })).toMatchObject({ deltaY: 0, maxLineY: 2, minLineY: 0 })
  const hidden = updateVirtualList({ ...state, height: 0 })
  expect(hidden.maxLineY).toBe(hidden.minLineY)
  expect(updateVirtualList(state, NaN).deltaY).toBe(0)
  expect(updateVirtualList(state, -100).deltaY).toBe(0)
})

test('resizing keeps the end visible and expands the rendered range', () => {
  const state = updateVirtualList({ ...createState(), height: 360 })
  expect(state).toMatchObject({ maxLineY: 10_000, minLineY: 9980 })
})

test('wheel handles line and page units and keyboard scrolls the log', () => {
  const state = handleKeyDown(createState(), 'Home')
  expect(handleWheel(state, 1, 2).deltaY).toBe(36)
  expect(handleWheel(state, 2, 1).deltaY).toBe(180)
  expect(handleKeyDown(state, 'ArrowDown').deltaY).toBe(18)
  expect(handleKeyDown(state, 'ArrowUp').deltaY).toBe(0)
  expect(handleKeyDown(state, 'PageDown').deltaY).toBe(180)
  expect(handleKeyDown(state, 'PageUp').deltaY).toBe(0)
  expect(handleKeyDown(state, 'a')).toBe(state)
})

test('scrollbar supports track clicks, thumb dragging and capture loss', () => {
  const state = { ...createState(), y: 100 }
  const clicked = handleScrollBarClick(state, 190)
  expect(clicked).toMatchObject({ deltaY: 89_910, handleOffset: 10, scrollBarActive: true })
  const dragged = handleScrollBarMove(clicked, 110)
  expect(dragged).toMatchObject({ deltaY: 0, followOutput: false })
  const thumb = handleScrollBarClick(dragged, 105)
  expect(thumb.handleOffset).toBe(5)
  expect(handleScrollBarMove(thumb, 265).deltaY).toBe(state.finalDeltaY)
  const released = handleScrollBarCaptureLost(thumb)
  expect(handleScrollBarMove(released, 200)).toBe(released)
  const empty = createDefaultState()
  expect(handleScrollBarClick(empty, 20)).toBe(empty)
})

test('diff normalizes filters, channel switches and error rendering', () => {
  const state = createState()
  set(1, state, { ...state, filteredItems: createLines(1), filterValue: 'target' })
  expect(diff2(1)).toContain(1)
  expect(get(1).newState).toMatchObject({ deltaY: 0, maxLineY: 1, minLineY: 0 })
  set(1, state, { ...state, error: 'failed' })
  expect(diff2(1)).toContain(1)
  set(1, { ...state, followOutput: false }, { ...state, followOutput: false, selectedOption: 'another' })
  diff2(1)
  expect(get(1).newState.followOutput).toBe(true)
})
