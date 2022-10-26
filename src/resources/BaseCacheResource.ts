import md5 from 'md5'
import { StoreState } from '../createStore'
import { ApiQueryParams } from '../types/api'
import { generateCacheString } from '../utils/cache'

interface BaseCacheResourceInterface<T> {
  timeStamp: Date
  value: StoreState<T[]>
}

export interface GetAllInterface {
  param?: ApiQueryParams
  query: string
}
export interface GetInterface extends GetAllInterface {
  id?: string
}

export abstract class BaseCacheResource<T> {
  protected path: string
  private updatedAt = 0
  private ttl: number
  constructor(path: string) {
    this.path = path
    this.ttl = 3_600_000
  }

  public get({ id, query, param }: GetInterface): StoreState<T> | null {
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
      const values = JSON.parse(data).value

      for (let i = 0; i < values.length; i++) {
        if (values[i]._id === id) {
          const singleValuedData = values[i]

          return singleValuedData
        }
      }
    }

    return null
  }

  public getAll({ query, param }: GetAllInterface): StoreState<T[]> {
    const cacheString = generateCacheString({ query, param })

    const hashedKey = this.hash(cacheString)
    const localData = this.getLocalStorage(hashedKey)

    return localData !== null ? JSON.parse(localData).value : null
  }

  public post(data: T, query: string, param?: ApiQueryParams): void {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    this.invalidate(key)
  }

  public put(id: string, query: string, data: T, param?: ApiQueryParams): void {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)
    const cachedData = JSON.parse(this.getLocalStorage(key) ?? '')

    this.invalidate(key)
    if (cachedData) {
      const values = cachedData.value

      for (let i = 0; i < values.length; i++) {
        if (values[i]._id == id) {
          values[i] = data
          cachedData.value = values
        }
      }
      this.setLocalStorage(key, JSON.stringify(cachedData))
    }
  }

  public deleteLocal(id: string, query: string, param?: ApiQueryParams): void {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)
    const cachedData = JSON.parse(this.getLocalStorage(key) ?? '')

    this.invalidate(key)
    if (cachedData) {
      const values = cachedData.value

      for (let i = 0; i < values.length; i++) {
        if (values[i]._id == id) {
          cachedData.value = values.filter((value: StoreState<T[]>) => value.id !== id)
        }
      }
      this.setLocalStorage(key, JSON.stringify(cachedData))
    }
  }

  public async set(data: StoreState<T[]>, query: string, param?: ApiQueryParams): Promise<void> {
    const cacheString = generateCacheString({ query, param })
    const key = this.hash(cacheString)

    const value = this.addMetaData(data)

    this.setLocalStorage(key, value)
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
