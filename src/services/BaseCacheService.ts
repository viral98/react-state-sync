import { BaseCacheResource } from '../resources/BaseCacheResource'
const ttl: number = 3_600_000 // 1 hour
export abstract class BaseCacheService<T> {


  private cacheResource
  private data = null
  private updatedAt: number = 0
  constructor() {
    this.cacheResource = new BaseCacheResource<T>()
  }

  public async getAll() {

    throw new Error('Not implemented')
  }

  public async get(id: string) {
    const hasData = Boolean(this.data)
    const isFresh = Date.now() - this.updatedAt < ttl
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
