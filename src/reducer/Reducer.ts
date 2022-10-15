import { ActionTypes, BaseActions } from '../actions/BaseActions'
import { DefaultObject, StoreState } from '../createStore'

export function reducer<Shape extends DefaultObject>(
  state: StoreState<Shape>[],
  action: BaseActions<Shape>
): StoreState<Shape>[] {
  switch (action.type) {
    case ActionTypes.GET_ALL:
      return action.payload

    case ActionTypes.UPDATE:
      return state.map((stateItem: StoreState<Shape>) => {
        if (stateItem.id === action.payload.id) {
          return action.payload
        } else {
          return stateItem
        }
      })

    case ActionTypes.POST: {
      if (Array.isArray(state)) {
        state.push(action.payload)
      } else {
        throw new Error("The base shape isn't an array")
      }

      return state
    }
    case ActionTypes.DELETE:
      return state.filter((obj) => obj.id !== action.payload.id)

    default:
      console.error('Action must be a predefined actionType.')
  }

  //returning a placeholder here. This should return the updated store.
  return state
}
