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
import { handleKeyDown } from '../HandleKeyDown/HandleKeyDown.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import { handleScrollBarCaptureLost } from '../HandleScrollBarCaptureLost/HandleScrollBarCaptureLost.ts'
import { handleScrollBarClick } from '../HandleScrollBarClick/HandleScrollBarClick.ts'
import { handleScrollBarMove } from '../HandleScrollBarMove/HandleScrollBarMove.ts'
import { handleSelect } from '../HandleSelect/HandleSelect.ts'
import { handleSourceLinkClick } from '../HandleSourceLinkClick/HandleSourceLinkClick.ts'
import { handleWheel } from '../HandleWheel/HandleWheel.ts'
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
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'
import { setLogLevel } from '../SetLogLevel/SetLogLevel.ts'
import { setOutputChannel } from '../SetOutputChannel/SetOutputChannel.ts'
import * as WatchCallback from '../WatchCallbacks/WatchCallbacks.ts'

const handleDirectMessagePort = (port: MessagePort, setAsRendererProcess = true): Promise<void> =>
  HandleMessagePort.handleMessagePort(port, commandMap, setAsRendererProcess)

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
  'Output.handleKeyDown': WrapCommand.wrapCommand(handleKeyDown),
  'Output.handleMessagePort': handleDirectMessagePort,
  'Output.handleScrollBarCaptureLost': WrapCommand.wrapCommand(handleScrollBarCaptureLost),
  'Output.handleScrollBarClick': WrapCommand.wrapCommand(handleScrollBarClick),
  'Output.handleScrollBarMove': WrapCommand.wrapCommand(handleScrollBarMove),
  'Output.handleSelect': WrapCommand.wrapCommand(handleSelect),
  'Output.handleSourceLinkClick': WrapCommand.wrapCommand(handleSourceLinkClick),
  'Output.handleWheel': WrapCommand.wrapCommand(handleWheel),
  'Output.initialize': Initialize.initialize,
  'Output.loadContent2': WrapCommand.wrapCommand(loadContent),
  'Output.openFindWidget': WrapCommand.wrapCommand(openFindWidget),
  'Output.refresh': WrapCommand.wrapCommand(refresh),
  'Output.render2': Render2.render2,
  'Output.renderActions': WrapCommand.wrapGetter(renderActions),
  'Output.renderEventListeners': renderEventListeners,
  'Output.resize': WrapCommand.wrapCommand(Resize.resize),
  'Output.saveAs': WrapCommand.wrapCommand(saveOutputAs),
  'Output.saveState': WrapCommand.wrapGetter(SaveState.saveState),
  'Output.selectChannel': WrapCommand.wrapCommand(selectChannel),
  'Output.setDeltaY': WrapCommand.wrapCommand(setDeltaY),
  'Output.setLogLevel': setLogLevel,
  'Output.setOutputChannel': WrapCommand.wrapCommand(setOutputChannel),
  'Output.terminate': ViewletRegistry.terminate,
}
