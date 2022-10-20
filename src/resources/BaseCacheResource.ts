import md5 from 'md5'
import { StoreState } from '../createStore'
import { ApiQueryParams } from '../types/api'
import { generateCacheString } from '../utils/cache'

interface BaseCacheResourceInterface<T> {
  timeStamp: Date
  value: StoreState<T[]>
}

export interface GetInterface {
  id?: string
  param?: ApiQueryParams
  query: string
}

export abstract class BaseCacheResource<T> {
  protected path: string
  private updatedAt = 0
  private ttl: number
  constructor(path: string) {
    this.path = path
    this.ttl = 3_600_000
  }

  public get({ query, param }: GetInterface): StoreState<T[]> | null {
    const timeStamp = this.getTimeStamp(query, param)
    let currentTime = 0

    if (timeStamp) {
      currentTime = new Date(timeStamp).getTime()
    }

    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)
    const data = this.getLocalStorage(key)

    if (!data) {
      return null
    }

    const isFresh = data ? new Date().getTime() - currentTime < this.ttl : false

    if (isFresh && data) {
      return (JSON.parse(data) as BaseCacheResourceInterface<T>).value
    }

    return null
  }

  public getAll(query?: ApiQueryParams): BaseCacheResourceInterface<T> {
    const cacheString = generateCacheString({ param: query })

    const hashedKey = this.hash(cacheString)

    return JSON.parse(this.getLocalStorage(hashedKey) ?? '')
  }

  public post(data: T, query: string, param?: ApiQueryParams): void {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    this.invalidate(key)
  }

  public put(query: string, data: T, param?: ApiQueryParams): void {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    this.invalidate(key)
  }

  public delete(id: string, query: string, param?: ApiQueryParams): void {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    this.invalidate(key)
  }

  public async set(data: StoreState<T[]>, query: string, param?: ApiQueryParams): Promise<void> {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    const value = this.addMetaData(data)

    this.setLocalStorage(key, JSON.stringify(value))
  }

  private hash(query: string): string {
    const hashedQuery = md5(JSON.stringify(query))

    return hashedQuery
  }

  private invalidate(key: string) {
    localStorage.removeItem(key)
  }

  protected getPath() {
    return this.path
  }

  private setLocalStorage(key: string, data: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, data)
    }
  }

  private getLocalStorage(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    } else {
      return null
    }
  }

  private addMetaData(data: StoreState<T[]>): string {
    const meta: BaseCacheResourceInterface<T> = {
      timeStamp: new Date(),
      value: data
    }

    return JSON.stringify(meta)
  }

  private getTimeStamp(query?: string, param?: ApiQueryParams): Date | undefined {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    const data = this.getLocalStorage(key)

    return data ? JSON.parse(data)?.timeStamp : undefined
  }
}
