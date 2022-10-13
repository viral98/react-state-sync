import md5 from 'md5'

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

  public get(query: string): T | null {
    return this.cache?.get(this.hash(query))?.value ?? null
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
