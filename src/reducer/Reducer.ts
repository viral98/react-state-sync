import { actionTypes, BaseActions } from '../actions/BaseActions'
import { StoreState } from '../createStore'

export function reducer<Shape>(
  state: StoreState<Shape>[],
  action: BaseActions<Shape>
): StoreState<Shape>[] {
  switch (action.actionType) {
    case actionTypes.UPDATE:
      return state.map((stateItem: StoreState<Shape>) => {
        if (stateItem.id === action.payload.id) {
          return action.payload
        } else {
          return stateItem
        }
      })
      break

    case actionTypes.POST: {
      if (Array.isArray(state)) {
        state.push(action.payload)
      } else {
        throw new Error("The base shape isn't an array")
      }

      return state
    }
    case actionTypes.DELETE:
      console.log('Delete values from the store here')
      break

    default:
      console.error('Action must be a predefined actionType.')
  }

  //returning a placeholder here. This should return the updated store.
  return state
}
