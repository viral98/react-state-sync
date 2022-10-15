import { BaseCacheResource } from '../resources/BaseCacheResource'
import { ApiQueryParams } from '../types/api'

export abstract class BaseCacheService<T> extends BaseCacheResource<T> {
  private ttl: number
  private updatedAt: number

  constructor() {
    super()

    this.ttl = 3_600_000
    this.updatedAt = 0
  }

  public async getAll() {
    throw new Error('Not implemented')
  }

  public async getCachedValue(param: ApiQueryParams): Promise<T | null> {
    const data = this.get(param)
    const hasData = Boolean(data)

    const timeStamp = data?.timeStamp
    let currentTime = 0

    if (timeStamp) {
      currentTime = timeStamp.getTime()
    }

    //TODO: Check how to perform date calculations without using moment.js
    const isFresh = data ? new Date().getTime() - currentTime < this.ttl : false

    //The data is fresh
    if (isFresh && data) {
      return data?.value
    }

    const deferred = await fetch(process.env.NEXT_PUBLIC_API_URL)

    //The data is stale
    //const deferred = TODO: fetch and store data.then((result: Data) => {
    // TODO: hashing logic
    // data = result
    //return this.set(param)
    //})

    // The data is not cached

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
    const dataToCreate = await fetch(process.env.NEXT_PUBLIC_API_URL)

    throw new Error('Not implemented')
  }
}
