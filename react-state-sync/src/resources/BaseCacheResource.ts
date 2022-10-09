export abstract class BaseCacheResource<T> {
  protected cache: Map<string, T> | undefined;

  protected abstract fetch(): Promise<T>;

  public async get(): Promise<T> {
   throw new Error("Not implemented");
  }

  public async set(query: string, data: T): Promise<void> {
    throw new Error("Not implemented");
  }
  
}