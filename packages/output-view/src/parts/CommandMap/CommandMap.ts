import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import { closeFindWidget } from '../CloseFindWidget/CloseFindWidget.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import { handleData } from '../HandleData/HandleData.ts'
import { handleError } from '../HandleError/HandleError.ts'
import { handleSelect } from '../HandleSelect/HandleSelect.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import { openFindWidget } from '../OpenFindWidget/OpenFindWidget.ts'
import { getActions } from '../OutputActions/OutputActions.ts'
import * as WrapCommand from '../OutputStates/OutputStates.ts'
import * as Render2 from '../Render2/Render2.ts'
import { renderActions } from '../RenderActions/RenderActions.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import { setOutputChannel } from '../SetOutputChannel/SetOutputChannel.ts'

export const commandMap = {
  'Output.closeFindWidget': WrapCommand.wrapCommand(closeFindWidget),
  'Output.create': Create.create,
  'Output.diff2': Diff2.diff2,
  'Output.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'Output.getCommandIds': GetCommandIds.getCommandIds,
  'Output.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Output.handleData': WrapCommand.wrapCommand(handleData),
  'Output.handleError': WrapCommand.wrapCommand(handleError),
  'Output.initialize': Initialize.initialize,
  'Output.loadContent2': WrapCommand.wrapCommand(loadContent),
  'Output.openFindWidget': WrapCommand.wrapCommand(openFindWidget),
  'Output.render2': Render2.render2,
  'Output.renderActions': WrapCommand.wrapGetter(renderActions),
  'Output.renderEventListeners': renderEventListeners,
  'Output.resize': Resize.resize,
  'Output.saveState': SaveState.saveState,
  'Output.setOutputChannel': WrapCommand.wrapCommand(setOutputChannel),
  'Output.getActions': getActions,
  'Output.terminate': ViewletRegistry.terminate,
  'Output.handleSelect': WrapCommand.wrapCommand(handleSelect),
}
