import { BaseCacheResource } from '../resources/BaseCacheResource'

export abstract class BaseCacheService<T> {
  private ttl: number
  private data = null
  private updatedAt: number = 0
  constructor() {
    this.ttl = 3_600_000
  }

  public async getAll() {
    throw new Error('Not implemented')
  }

  public async get(id: string) {
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
