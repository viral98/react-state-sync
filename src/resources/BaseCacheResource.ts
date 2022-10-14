import md5 from 'md5'
import { ApiQueryParams } from '../types/api'

interface BaseCacheResourceInterface<T> {
  timeStamp: Date
  value: T
}
export abstract class BaseCacheResource<T> {
  protected cache: Map<string, BaseCacheResourceInterface<T>> | undefined

  constructor() {
    //Hydrate function
    this.cache = JSON.parse(window.localStorage.getItem(this.getName()) ?? '') as Map<
      string,
      BaseCacheResourceInterface<T>
    >
  }

  public get(query: ApiQueryParams): BaseCacheResourceInterface<T> | null {
    return this.cache?.get(this.hash(query)) ?? null
  }

  public async set(query: ApiQueryParams, data: T): Promise<void> {
    const key = this.hash(query)

    const value: BaseCacheResourceInterface<T> = {
      timeStamp: new Date(),
      value: data
    }

    this.cache?.set(key, value)
  }

  private hash(query: ApiQueryParams): string {
    const hashedQuery = md5(JSON.stringify(query))

    return hashedQuery
  }

  protected abstract getName(): string
}
