import type { DomEventListener } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
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
      name: DomEventListenerFunctions.HandlePointerDown,
      params: ['handleClickAt', 'event.clientX', 'event.clientY'],
    },
  ]
}
