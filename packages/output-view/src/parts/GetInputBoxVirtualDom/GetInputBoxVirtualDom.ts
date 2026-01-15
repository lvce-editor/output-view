import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getInputBoxVirtualDom = (name: string, onInput: string, placeholder: string): VirtualDomNode => {
  return {
    autocapitalize: 'off',
    autocorrect: 'off',
    className: ClassNames.InputBox,
    name,
    onInput: onInput,
    placeholder: placeholder,
    spellcheck: false,
    type: VirtualDomElements.Input,
  }
}
