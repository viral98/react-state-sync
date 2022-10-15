import md5 from 'md5'
import { ApiQueryParams } from '../types/api'

interface BaseCacheResourceInterface<T> {
  timeStamp: string
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

  public get(id: string, url: string, query?: ApiQueryParams): T | null {
    return this.cache?.get(this.hash([url, query].toString()))?.value ?? null
  }

  public getAll(url: string, query?: ApiQueryParams): T[] {
    throw new Error(`${url} ${query}, this is not implemented`)
  }

  public post(url: string, data: T, query?: ApiQueryParams): Promise<T> {
    throw new Error(`${url} ${data} ${query}, this is not implemented`)
  }

  public put(url: string, data: T, query?: ApiQueryParams): Promise<T> {
    throw new Error(`${url} ${data} ${query}, this is not implemented`)
  }

  public delete(id: string, url: string, query?: ApiQueryParams): Promise<void> {
    throw new Error(`${url} ${query} ${id}, this is not implemented`)
  }

  public async set(query: string, data: T): Promise<void> {
    const key = this.hash(query)

    const value: BaseCacheResourceInterface<T> = {
      timeStamp: new Date().toUTCString(),
      value: data
    }

    this.cache?.set(key, value)
  }

  private hash(query: string): string {
    const hashedQuery = md5(query)

    return hashedQuery
  }

  protected abstract getName(): string
}
