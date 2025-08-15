import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { OutputState } from '../OutputState/OutputState.ts'

export const { get, set, wrapCommand, wrapGetter, getKeys } = ViewletRegistry.create<OutputState>()
