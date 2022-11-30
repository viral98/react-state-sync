import { ActionTypes } from '../../actions/BaseActions'
import { DefaultObject, StoreState } from '../../createStore'
import { Action } from '../../types/action'
import { Book } from '../../types/books'

interface UpdateAction<Book> extends Action<ActionTypes.UPDATE> {
  payload: StoreState<Book>
}
interface DeleteAction<Book> extends Action<ActionTypes.DELETE> {
  payload: StoreState<Book>
}
interface GetAllAction<Book> extends Action<ActionTypes.GET_ALL> {
  payload: StoreState<Book[]>
}
interface PostAction<Book> extends Action<ActionTypes.POST> {
  payload: StoreState<Book>
}

interface ActionReturnType {
  type: string
  payload: StoreState<Book>
}

export type BaseActions<Book> =
  | UpdateAction<Book>
  | DeleteAction<Book>
  | GetAllAction<Book>
  | PostAction<Book>

export function UpdateValueInStore<Book extends DefaultObject>({
  payload
}: {
  payload: StoreState<Book>
}): ActionReturnType {
  return {
    type: ActionTypes.UPDATE,
    payload
  }
}

export function DeleteValueFromStore<Book extends DefaultObject>({
  payload
}: {
  payload: StoreState<Book>
}): ActionReturnType {
  return {
    type: ActionTypes.DELETE,
    payload
  }
}

export function PutAllValuesInStore<Book extends DefaultObject>({
  payload
}: {
  payload: StoreState<Book>
}): ActionReturnType {
  return {
    type: ActionTypes.GET_ALL,
    payload
  }
}

export function AddANewValueInStore<Book extends DefaultObject>({
  payload
}: {
  payload: StoreState<Book>
}): ActionReturnType {
  return {
    type: ActionTypes.POST,
    payload
  }
}

export function bookReducer<Book extends DefaultObject>(
  state: StoreState<Book>[],
  action: BaseActions<Book>
): StoreState<Book>[] {
  switch (action.type) {
    case ActionTypes.GET_ALL:
      return state

    case ActionTypes.UPDATE:
      return state.map((stateItem: StoreState<Book>) => {
        if (stateItem._id === action.payload._id) {
          return action.payload
        } else {
          return stateItem
        }
      })

    case ActionTypes.POST: {
      return [...state, action.payload]
    }
    case ActionTypes.DELETE:
      return state.filter((obj) => obj._id !== action.payload._id)

    default:
      console.error('Action must be a predefined actionType.')
  }
  return state
}
