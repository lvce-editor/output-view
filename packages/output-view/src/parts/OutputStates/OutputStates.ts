import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { OutputState } from '../OutputState/OutputState.ts'

export const { dispose, get, getCommandIds, getKeys, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<OutputState>()
