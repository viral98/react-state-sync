import { ActionTypes, PutAllValuesInStore } from '../actions/BaseActions'
import createStore, { DefaultObject, StoreState } from '../createStore'
import { BaseCacheService } from '../services/BaseCacheService'

export class BaseResource<T extends DefaultObject> {
  private store
  private cacheServiceResource: BaseCacheService<T>
  private path

  constructor(cacheResource: BaseCacheService<T>, path: string) {
    this.store = createStore({} as StoreState<T[]>)
    this.path = path
    this.cacheServiceResource = cacheResource
  }

  public getAll = async () => {
    const resp = await this.cacheServiceResource.getAllValues()

    if (resp) {
      PutAllValuesInStore({
        payload: resp,
        store: this.store,
        state: this.store.getState(),
        type: ActionTypes.GET_ALL
      })
    }

    return this.store.getState()
  }

  public post = async (data: Partial<T>) => {
    console.error(data)

    throw new Error('Not implemented')
  }

  public get = async (id: string) => {
    console.error(id)

    throw new Error('Not implemented')
  }

  public put = async (id: string, data: Partial<T>) => {
    console.error(id, data)

    throw new Error('Not implemented')
  }

  public delete = async (id: string) => {
    console.error(id)

    throw new Error('Not implemented')
  }

  public getValues = (myCallBack: (state: T[]) => void) => {
    this.store.subscribe(myCallBack)
  }

  public getValue = (inputKey: keyof T, id: string) => {
    return this.store.getState().find((object) => object.id === id)?.[inputKey]
  }

  public getObject = (id: string) => {
    return this.store.getState().find((object) => object.id === id)
  }
}
