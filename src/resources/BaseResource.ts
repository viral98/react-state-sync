import createStore from '../createStore'
import { BaseCacheResource } from './BaseCacheResource'

export abstract class BaseResource<T> {
  private store
  private cacheResource

  constructor(cacheResource: BaseCacheResource<T>) {
    this.store = createStore([] as T[])
    this.cacheResource = cacheResource
  }

  protected abstract getPath(): string

  protected abstract getName(): string

  public getAll = async () => {
    const resp = this.cacheResource.getAll()

    if (resp) {
      this.store.setState(resp)
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
