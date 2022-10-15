import { StoreState } from '../createStore'

export enum actionTypes {
  UPDATE = 'update',
  POST = 'post',
  DELETE = 'delete'
}

export interface BaseActions<T> {
  actionType: actionTypes
  payload: StoreState<T>
}
