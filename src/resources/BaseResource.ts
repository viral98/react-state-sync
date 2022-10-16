import { ActionTypes, PutAllValuesInStore } from '../actions/BaseActions'
import createStore, { DefaultObject, StoreState } from '../createStore'
import { BaseCacheResource } from './BaseCacheResource'

export abstract class BaseResource<T extends DefaultObject> {
  private store
  private cacheResource: BaseCacheResource<T>

  constructor(cacheResource: BaseCacheResource<T>) {
    this.store = createStore({} as StoreState<T[]>)

    this.cacheResource = cacheResource
  }

  protected abstract getPath(): string

  protected abstract getName(): string

  public getAll = async () => {
    const resp = await this.cacheResource.getAll()

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
}
