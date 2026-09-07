import type { DomEventListener } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    { name: DomEventListenerFunctions.HandleWheel, params: ['handleWheel', 'event.deltaMode', 'event.deltaY'], passive: true },
    { name: DomEventListenerFunctions.HandleKeyDown, params: ['handleKeyDown', 'event.key'] },
    {
      name: DomEventListenerFunctions.HandleScrollBarPointerDown,
      params: ['handleScrollBarClick', 'event.clientY'],
      preventDefault: true,
      stopPropagation: true,
      trackPointerEvents: [DomEventListenerFunctions.HandleScrollBarMove, DomEventListenerFunctions.HandleScrollBarPointerCaptureLost],
    } as DomEventListener,
    { name: DomEventListenerFunctions.HandleScrollBarMove, params: ['handleScrollBarMove', 'event.clientY'] },
    { name: DomEventListenerFunctions.HandleScrollBarPointerCaptureLost, params: ['handleScrollBarCaptureLost'] },
    {
      name: DomEventListenerFunctions.HandleBlur,
      params: ['handleBlur'],
    },
    {
      name: DomEventListenerFunctions.HandleButtonClick,
      params: ['handleButtonClick', 'event.target.name'],
    },
    {
      name: DomEventListenerFunctions.HandleSelect,
      params: ['handleSelect', 'event.target.value'],
    },
    {
      name: DomEventListenerFunctions.HandleContextMenu,
      params: ['handleContextMenu', 'event.clientX', 'event.clientY'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleFilterInput,
      // @ts-ignore
      params: ['handleFilterInput', 'event.target.value', InputSource.User],
    },
    {
      name: DomEventListenerFunctions.HandleClearFilterClick,
      params: ['clearFilter'],
    },
    {
      name: DomEventListenerFunctions.HandleSourceLinkClick,
      params: ['handleSourceLinkClick', 'event.target.href', 'event.target.dataset.line', 'event.target.dataset.column'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandlePointerDown,
      params: ['handleClickAt', 'event.clientX', 'event.clientY'],
    },
  ]
}
