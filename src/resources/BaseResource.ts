import {
  ActionTypes,
  AddANewValueInStore,
  DeleteValueFromStore,
  PutAllValuesInStore,
  UpdateValueInStore
} from '../actions/BaseActions'
import createStore, { DefaultObject, StoreState } from '../createStore'
import { BaseCacheService } from '../services/BaseCacheService'
import { ApiQueryParams, ApiResponse } from '../types/api'

export class BaseResource<T extends DefaultObject> {
  private store
  private cacheServiceResource: BaseCacheService<T>
  private path

  constructor(cacheResource: BaseCacheService<T>, path: string) {
    this.store = createStore({} as StoreState<T[]>)
    this.path = path
    this.cacheServiceResource = cacheResource
  }

  public getAll = async (param?: ApiQueryParams, force?: boolean) => {
    const resp = await this.cacheServiceResource.getAllValues(param, force)

    if (resp) {
      PutAllValuesInStore({
        payload: resp,
        store: this.store,
        state: this.store.getState(),
        type: ActionTypes.GET_ALL
      })
    }

    return this.store.getState() as unknown as ApiResponse<StoreState<T[]>>
  }

  public post = async (data: Partial<T>) => {
    const newVal = await this.cacheServiceResource.create(data)

    if (newVal) {
      AddANewValueInStore({
        payload: newVal,
        store: this.store,
        state: this.store.getState(),
        type: ActionTypes.POST
      })
    }
  }

  public get = async (id: string) => {
    const record = await this.cacheServiceResource.getSingleValue(id)

    return record as unknown as ApiResponse<StoreState<T>>
  }

  public put = async (id: string, data: T) => {
    const updatedValue = await this.cacheServiceResource.update(id, data)

    if (updatedValue) {
      UpdateValueInStore({
        payload: updatedValue,
        store: this.store,
        state: this.store.getState(),
        type: ActionTypes.UPDATE
      })
    }
  }

  public delete = async (id: string) => {
    await this.cacheServiceResource.delete(id)

    DeleteValueFromStore({
      payload: { _id: id } as StoreState<T>,
      store: this.store,
      state: this.store.getState(),
      type: ActionTypes.DELETE
    })
  }

  public getValues = (myCallBack: (state: T[]) => void) => {
    this.store.subscribe(myCallBack)
  }

  public getValue = (inputKey: keyof T, id: string) => {
    return this.store.getState().find((object) => object._id === id)?.[inputKey]
  }

  public getObject = (id: string) => {
    return this.store.getState().find((object) => object._id === id)
  }

  public getStore = () => {
    return this.store
  }
}
