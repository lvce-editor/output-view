import { filterItems } from '../FilterItems/FilterItems.ts'
import { loadLines } from '../LoadLines/LoadLines.ts'
import * as OutputStates from '../OutputStates/OutputStates.ts'

export const handleFileChange = async (watchId: number): Promise<void> => {
  const keys = OutputStates.getKeys()
  for (const key of keys) {
    const instance = OutputStates.get(key)
    if (instance.newState.watchId === watchId) {
      // TODO race condition
      const { lines, error, code } = await loadLines(instance.newState.uri)
      const filteredItems = filterItems(lines, instance.newState.filterValue)
      OutputStates.set(instance.newState.uid, instance.oldState, {
        ...instance.newState,
        listItems: lines,
        filteredItems,
        error,
        errorCode: code,
      })
    }
  }
}
