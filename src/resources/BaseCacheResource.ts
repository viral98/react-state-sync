export class BaseCacheResource<T> {
  protected cache: Map<string, T> | undefined

  public async get(): Promise<T> {
    throw new Error('Not implemented')
  }

  public async set(query: string, data: T): Promise<void> {
    console.error(query, data)

    throw new Error('Not implemented')
  }
}
