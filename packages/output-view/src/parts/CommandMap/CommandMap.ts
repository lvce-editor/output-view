import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import * as Clear from '../Clear/Clear.ts'
import { closeFindWidget } from '../CloseFindWidget/CloseFindWidget.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import { disableScrollLock } from '../DisableScrollLock/DisableScrollLock.ts'
import { enableScrollLock } from '../EnableScrollLock/EnableScrollLock.ts'
import * as FocusIndex from '../FocusIndex/FocusIndex.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import { handleButtonClick } from '../HandleButtonClick/HandleButtonClick.ts'
import { handleContextMenu } from '../HandleContextMenu/HandleContextMenu.ts'
import { handleData } from '../HandleData/HandleData.ts'
import { handleError } from '../HandleError/HandleError.ts'
import { handleFilterInput } from '../HandleFilterInput/HandleFilterInput.ts'
import { handleSelect } from '../HandleSelect/HandleSelect.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'
import { openFindWidget } from '../OpenFindWidget/OpenFindWidget.ts'
import { getActions } from '../OutputActions/OutputActions.ts'
import * as WrapCommand from '../OutputStates/OutputStates.ts'
import { refresh } from '../Refresh/Refresh.ts'
import * as Render2 from '../Render2/Render2.ts'
import { renderActions } from '../RenderActions/RenderActions.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import { saveOutputAs } from '../SaveOutputAs/SaveOutputAs.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import { selectChannel } from '../SelectChannel/SelectChannel.ts'
import { setLogLevel } from '../SetLogLevel/SetLogLevel.ts'
import { setOutputChannel } from '../SetOutputChannel/SetOutputChannel.ts'
import * as WatchCallback from '../WatchCallbacks/WatchCallbacks.ts'

export const commandMap = {
  'Output.clear': WrapCommand.wrapCommand(Clear.clear),
  'Output.closeFindWidget': WrapCommand.wrapCommand(closeFindWidget),
  'Output.create': Create.create,
  'Output.diff2': Diff2.diff2,
  'Output.disableScrollLock': WrapCommand.wrapCommand(disableScrollLock),
  'Output.enableScrollLock': WrapCommand.wrapCommand(enableScrollLock),
  'Output.executeWatchCallback': WatchCallback.executeWatchCallBack,
  'Output.focusIndex': WrapCommand.wrapCommand(FocusIndex.focusIndex),
  'Output.getActions': getActions,
  'Output.getCommandIds': WrapCommand.getCommandIds,
  'Output.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Output.handleButtonClick': WrapCommand.wrapCommand(handleButtonClick),
  'Output.handleContextMenu': WrapCommand.wrapCommand(handleContextMenu),
  'Output.handleData': WrapCommand.wrapCommand(handleData),
  'Output.handleError': WrapCommand.wrapCommand(handleError),
  'Output.handleFilterInput': WrapCommand.wrapCommand(handleFilterInput),
  'Output.handleSelect': WrapCommand.wrapCommand(handleSelect),
  'Output.initialize': Initialize.initialize,
  'Output.loadContent2': WrapCommand.wrapCommand(loadContent),
  'Output.openFindWidget': WrapCommand.wrapCommand(openFindWidget),
  'Output.refresh': WrapCommand.wrapCommand(refresh),
  'Output.render2': Render2.render2,
  'Output.renderActions': WrapCommand.wrapGetter(renderActions),
  'Output.renderEventListeners': renderEventListeners,
  'Output.resize': Resize.resize,
  'Output.saveOutputAs': WrapCommand.wrapCommand(saveOutputAs),
  'Output.saveState': WrapCommand.wrapGetter(SaveState.saveState),
  'Output.selectChannel': WrapCommand.wrapCommand(selectChannel),
  'Output.setLogLevel': setLogLevel,
  'Output.setOutputChannel': WrapCommand.wrapCommand(setOutputChannel),
  'Output.terminate': ViewletRegistry.terminate,
}
