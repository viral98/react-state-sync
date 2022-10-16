import { StoreState } from '../createStore'
import { BaseCacheResource } from '../resources/BaseCacheResource'
import { ApiQueryParams } from '../types/api'
import api from '../utils/api'

export abstract class BaseCacheService<T> extends BaseCacheResource<T> {
  private ttl: number
  private data = null
  private updatedAt = 0
  private api

  constructor() {
    super()
    this.ttl = 3_600_000
    this.api = api({})
  }

  public async getAllValues(params?: ApiQueryParams): Promise<StoreState<T[]>> {
    const cachedData = await this.getAll()

    if (cachedData) {
      return cachedData
    } else {
      //TODO: Add logic to store data in cache

      const serverData = await (
        await this.api(process.env.NEXT_PUBLIC_API_URL + this.getName(), params ?? {})
      ).json()

      return serverData as unknown as StoreState<T[]>
    }

    throw new Error('Not implemented')
  }

  public async getSingleValue(id: string) {
    const hasData = Boolean(this.data)
    const isFresh = Date.now() - this.updatedAt < this.ttl

    if (isFresh) {
      return this.data
    }
    //The data is fresh
    // const deferred = TODO: fetch and store data.then((result: Data) => {
    // TODO: hashing logic
    // updatedAt = Date.now()
    // data = result
    //return data
    //})

    //  The data is stale

    if (hasData) {
      return this.data
    }

    // The data is not cached

    //return this.deferred
    console.error(id)

    throw new Error('Not implemented')
  }

  public async update(id: string, data: Partial<T>) {
    console.error(id, data)

    throw new Error('Not implemented')
  }

  public async delete(id: string) {
    console.error(id)

    throw new Error('Not implemented')
  }

  public async create(data: Partial<T>) {
    console.error(data)

    throw new Error('Not implemented')
  }
}
