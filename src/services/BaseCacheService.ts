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
      return cachedData.value
    } else {
      //TODO: Add logic to store data in cache

      const serverData = await (
        await this.api(process.env.NEXT_PUBLIC_API_URL + this.getPath(), params ?? {})
      ).json()

      return serverData as unknown as StoreState<T[]>
    }

    throw new Error('Not implemented')
  }

  public async getSingleValue(param: ApiQueryParams, id: string, query: string): Promise<T | null> {
    const data = this.get({ id, param, query })
    //const hasData = Boolean(data)

    const timeStamp = this.getTimeStamp(query, param)
    let currentTime = 0

    if (timeStamp) {
      currentTime = timeStamp.getTime()
    }

    //TODO: Check how to perform date calculations without using moment.js
    const isFresh = data ? new Date().getTime() - currentTime < this.ttl : false

    //The data is fresh
    if (isFresh && data) {
      return data
    }

    //const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + this.getPath())

    //The data is stale
    //const deferred = TODO: fetch and store data.then((result: Data) => {
    // TODO: hashing logic
    // data = result
    //return this.set(param)
    //})

    // The data is not cached
    return null
    //return this.deferred
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
    //const dataToCreate = await fetch(process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_PATH)
    console.log(data)
    throw new Error('Not implemented')
  }
}
