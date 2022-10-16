import { CreateStoreReturn, DefaultObject, StoreState } from '../createStore'
import { baseReducer } from '../reducer/Reducer'
import { Action } from '../types/action'

interface BaseActionProps<T extends DefaultObject> {
  store: CreateStoreReturn<T>
  state: StoreState<T>[]
}
export enum ActionTypes {
  GET_ALL = 'GET_ALL',
  UPDATE = 'UPDATE',
  POST = 'POST',
  DELETE = 'DELETE'
}

interface UpdateAction<T> extends Action<ActionTypes.UPDATE> {
  payload: StoreState<T>
}
interface DeleteAction<T> extends Action<ActionTypes.DELETE> {
  payload: StoreState<T>
}
interface GetAllAction<T> extends Action<ActionTypes.GET_ALL> {
  payload: StoreState<T[]>
}
interface PostAction<T> extends Action<ActionTypes.POST> {
  payload: StoreState<T>
}

export type BaseActions<T> = UpdateAction<T> | DeleteAction<T> | GetAllAction<T> | PostAction<T>

export function UpdateValueInStore<T extends DefaultObject>({
  payload,
  store,
  state
}: UpdateAction<T> & BaseActionProps<T>) {
  store.setState(
    baseReducer(state, {
      type: ActionTypes.UPDATE,
      payload
    })
  )
}

export function DeleteValueFromStore<T extends DefaultObject>({
  payload,
  store,
  state
}: DeleteAction<T> & BaseActionProps<T>) {
  store.setState(
    baseReducer(state, {
      type: ActionTypes.DELETE,
      payload
    })
  )
}

export function PutAllValuesInStore<T extends DefaultObject>({
  payload,
  store,
  state,
  type = ActionTypes.GET_ALL
}: GetAllAction<T> & BaseActionProps<T>) {
  store.setState(
    baseReducer(state, {
      type: type,
      payload
    })
  )
}

export function AddANewValueInStore<T extends DefaultObject>({
  payload,
  store,
  state
}: PostAction<T> & BaseActionProps<T>) {
  store.setState(
    baseReducer(state, {
      type: ActionTypes.POST,
      payload
    })
  )
}
