import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import * as WrapCommand from '../OutputStates/OutputStates.ts'
import * as Render2 from '../Render2/Render2.ts'
import { renderActions } from '../RenderActions/RenderActions.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'

export const commandMap = {
  'Problems.create': Create.create,
  'Problems.diff2': Diff2.diff2,
  'Problems.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'Problems.getCommandIds': GetCommandIds.getCommandIds,
  'Problems.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Problems.initialize': Initialize.initialize,
  'Problems.loadContent': WrapCommand.wrapCommand(loadContent),
  'Problems.render2': Render2.render2,
  'Problems.renderActions': renderActions,
  'Problems.renderEventListeners': renderEventListeners,
  'Problems.resize': Resize.resize,
  'Problems.saveState': SaveState.saveState,
  'Problems.terminate': ViewletRegistry.terminate,
}
