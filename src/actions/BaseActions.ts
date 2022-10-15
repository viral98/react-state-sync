import { StoreState } from '../createStore'
import { Action } from '../types/action'

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
