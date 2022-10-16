import md5 from 'md5'
import { StoreState } from '../createStore'
import { ApiQueryParams } from '../types/api'
import { generateCacheString } from '../utils/cache'

interface BaseCacheResourceInterface<T> {
  timeStamp: Date
  value: StoreState<T[]>
}
export interface GetInterface {
  id: string
  param?: ApiQueryParams
  query?: string
}
export abstract class BaseCacheResource<T> {
  protected cache: Map<string, BaseCacheResourceInterface<T>> | undefined

  constructor() {
    //Hydrate function
    this.cache =
      window.localStorage.getItem(this.getPath()) !== null
        ? (JSON.parse(window.localStorage.getItem(this.getPath()) ?? '') as Map<
            string,
            BaseCacheResourceInterface<T>
          >)
        : new Map<string, BaseCacheResourceInterface<T>>()
  }

  public get({ id, query, param }: GetInterface): T | null {
    //TODO: FIX BASE CACHE RESOURCE INTERFACE'S VALUE TO BE OF TYPE STORE STATE
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    const values = this.cache?.get(key)?.value

    console.log(values)
    console.log(id)
    //values?.forEach((element) => {
    //if (element.id == id) {
    //return element
    //} else {
    //return null
    //}
    //})
    // return (
    //   this.cache
    //     ?.get(this.hash([this.getPath(), query].toString()))
    //     ?.value.filter((obj) => obj.id === id) ?? null
    // )

    return null
  }
  public getTimeStamp(query: string, param: ApiQueryParams): Date | undefined {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    return this.cache?.get(key)?.timeStamp
  }

  public getAll(query?: ApiQueryParams): BaseCacheResourceInterface<T> | null {
    console.error('Get All is not defined', query)
    return null
  }

  public post(data: T, query?: ApiQueryParams): Promise<T> {
    this.invalidate()
    throw new Error(` ${data} ${query}, this is not implemented`)
  }

  public put(url: string, data: T, query?: ApiQueryParams): Promise<T> {
    this.invalidate()
    throw new Error(` ${data} ${query}, this is not implemented`)
  }

  public delete(id: string, url: string, query?: ApiQueryParams): Promise<void> {
    this.invalidate()
    throw new Error(`${query} ${id}, this is not implemented`)
  }

  public async set(param: ApiQueryParams, data: StoreState<T[]>, query: string): Promise<void> {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    const value: BaseCacheResourceInterface<T> = {
      timeStamp: new Date(),
      value: data
    }

    this.cache?.set(key, value)
  }

  private hash(query: string): string {
    const hashedQuery = md5(JSON.stringify(query))

    return hashedQuery
  }

  private invalidate() {
    //TODO:Clear local storage
    this.cache?.clear()
  }

  protected abstract getPath(): string
}
